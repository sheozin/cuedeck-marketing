import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // Rate limit: reject extremely long messages
    if (message.length > 5000 || name.length > 200) {
      return NextResponse.json(
        { error: 'Message or name is too long.' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'CueDeck Contact Form <noreply@cuedeck.io>',
      to: ['hello@cuedeck.io'],
      replyTo: email,
      subject: `Contact form: ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        ``,
        `Message:`,
        message,
      ].join('\n'),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
