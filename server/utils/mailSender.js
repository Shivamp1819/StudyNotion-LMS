const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  const mailUser = process.env.MAIL_USER || "mrspsidhauli@gmail.com"
  const cleanPass = (process.env.MAIL_PASS || "gyut qfvt gfgs rreh").replace(/\s+/g, "")

  // 1. Try Vercel HTTPS Bridge (Port 443 - Bypasses cloud host SMTP port blocks)
  try {
    const vercelBridgeUrl = "https://study-notion-lms-gules.vercel.app/api/send-mail"
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 7000)

    const bridgeRes = await fetch(vercelBridgeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, title, body, user: mailUser, pass: cleanPass }),
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    if (bridgeRes.ok) {
      const data = await bridgeRes.json()
      if (data.success) {
        console.log("Email sent successfully via Vercel HTTPS bridge:", data)
        return data
      }
    }
  } catch (bridgeErr) {
    console.warn("Vercel bridge notice:", bridgeErr.message)
  }

  // 2. Direct SMTP fallback (Works on localhost and environments with open SMTP ports)
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mailUser,
        pass: cleanPass,
      },
      connectionTimeout: 4000,
      greetingTimeout: 4000,
    })

    const info = await transporter.sendMail({
      from: `"StudyNotion - Online Education" <${mailUser}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    })

    console.log("Email sent successfully via direct SMTP: ", info.response || info)
    return info
  } catch (error) {
    console.error("Direct SMTP error: ", error.message)
    throw error
  }
}

module.exports = mailSender
