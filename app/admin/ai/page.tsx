'use client';

import { useState, useRef } from 'react';
// Note: ANTHROPIC_API_KEY must be set as a server-side environment variable

type AiAction = 'generate' | 'improve' | 'expand' | 'summarize' | 'seo' | 'meta';

const ACTIONS: { id: AiAction; label: string; prompt: string }[] = [
  { id: 'generate', label: 'Generate Content', prompt: 'Write high-quality blog content for CueDeck about:' },
  { id: 'improve', label: 'Improve Writing', prompt: 'Improve this text for clarity and engagement:' },
  { id: 'expand', label: 'Expand', prompt: 'Expand this content with more detail:' },
  { id: 'summarize', label: 'Summarize', prompt: 'Summarize this content concisely:' },
  { id: 'seo', label: 'SEO Optimize', prompt: 'Rewrite this for better SEO, keeping the same tone:' },
  { id: 'meta', label: 'Generate Meta', prompt: 'Write an SEO meta title and meta description for this content:' },
];

export default function AiAgentsPage() {
  const [action, setAction] = useState<AiAction>('generate');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function handleRun() {
    if (!input.trim()) return;

    setLoading(true);
    setOutput('');
    abortRef.current = new AbortController();

    const selectedAction = ACTIONS.find((a) => a.id === action)!;
    const fullPrompt = `${selectedAction.prompt}\n\n${input}`;

    try {
      // API key lives server-side (ANTHROPIC_API_KEY env var) — not sent from client
      const res = await fetch('/api/cms-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: fullPrompt }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Request failed' }));
        setOutput(`Error: ${err.error ?? 'Unknown error'}`);
        setLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) { setLoading(false); return; }

      const decoder = new TextDecoder();
      let text = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setOutput(text);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setOutput(`Error: ${(err as Error).message}`);
      }
    }

    setLoading(false);
  }

  function handleStop() {
    abortRef.current?.abort();
    setLoading(false);
  }

  function copyOutput() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>AI Writing Assistant</h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Powered by Claude — generate, improve, and optimize content</p>
      </div>

      {/* Action tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {ACTIONS.map((a) => (
          <button
            key={a.id}
            onClick={() => setAction(a.id)}
            style={{
              padding: '7px 14px',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: action === a.id ? '#4A8EFF' : '#1e293b',
              background: action === a.id ? 'rgba(74,142,255,0.1)' : 'transparent',
              color: action === a.id ? '#4A8EFF' : '#64748b',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Input */}
        <div>
          <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your content, topic, or text to process…"
            rows={12}
            style={{
              width: '100%',
              padding: '14px',
              background: '#111827',
              border: '1px solid #1e293b',
              borderRadius: '10px',
              color: '#f1f5f9',
              fontSize: '13px',
              resize: 'vertical',
              lineHeight: 1.6,
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
          <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
            <button
              onClick={loading ? handleStop : handleRun}
              style={{
                flex: 1,
                padding: '10px',
                background: loading ? 'rgba(239,68,68,0.2)' : '#4A8EFF',
                border: 'none',
                borderRadius: '8px',
                color: loading ? '#f87171' : '#fff',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {loading ? '⏹ Stop' : '▶ Run'}
            </button>
          </div>
        </div>

        {/* Output */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Output
            </label>
            {output && (
              <button onClick={copyOutput} style={{ background: 'none', border: 'none', color: '#4A8EFF', fontSize: '12px', cursor: 'pointer' }}>
                Copy
              </button>
            )}
          </div>
          <div style={{
            minHeight: '280px',
            padding: '14px',
            background: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '10px',
            color: output ? '#f1f5f9' : '#475569',
            fontSize: '13px',
            lineHeight: 1.7,
            whiteSpace: 'pre-wrap',
            fontFamily: loading ? 'monospace' : 'inherit',
          }}>
            {loading && !output ? (
              <span style={{ color: '#4A8EFF' }}>Generating…</span>
            ) : output || 'AI output will appear here…'}
          </div>
        </div>
      </div>
    </div>
  );
}
