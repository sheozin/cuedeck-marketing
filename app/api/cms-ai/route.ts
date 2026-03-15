import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { prompt, apiKey } = await req.json() as { prompt: string; apiKey: string };

  if (!prompt || !apiKey) {
    return Response.json({ error: 'Missing prompt or API key' }, { status: 400 });
  }

  if (!apiKey.startsWith('sk-ant-')) {
    return Response.json({ error: 'Invalid API key format' }, { status: 400 });
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      stream: true,
      system: 'You are a content assistant for CueDeck, a live event production platform. Write in a professional, clear, and engaging tone. Focus on the benefits for event professionals.',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return Response.json({ error: (err as Record<string, string>).error ?? 'Anthropic API error' }, { status: res.status });
  }

  // Stream the response
  const stream = new ReadableStream({
    async start(controller) {
      const reader = res.body?.getReader();
      if (!reader) { controller.close(); return; }
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data) as { type: string; delta?: { type: string; text: string } };
              if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
                controller.enqueue(new TextEncoder().encode(parsed.delta.text));
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
