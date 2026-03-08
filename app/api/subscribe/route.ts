import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Optional: forward to Loops.so when LOOPS_API_KEY is set in Vercel env vars
    const loopsKey = process.env.LOOPS_API_KEY
    if (loopsKey) {
      const loopsRes = await fetch('https://app.loops.so/api/v1/contacts/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${loopsKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'marketing-site',
          userGroup: 'waitlist',
        }),
      })
      if (!loopsRes.ok) {
        console.error('Loops API error:', await loopsRes.text())
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
