const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    // 1. Check for HTTPS API (Port 443 - 100% unblocked on Render / Cloud Free Tiers)
    if (process.env.RESEND_API_KEY) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "StudyNotion <onboarding@resend.dev>",
            to: email,
            subject: title,
            html: body,
          }),
        })
        const data = await res.json()
        console.log("Email sent via Resend HTTPS API:", data)
        return data
      } catch (err) {
        console.error("Resend API delivery error:", err.message)
      }
    }

    if (process.env.BREVO_API_KEY) {
      try {
        const res = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": process.env.BREVO_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: { name: "StudyNotion", email: process.env.MAIL_USER || "info@studynotion.com" },
            to: [{ email }],
            subject: title,
            htmlContent: body,
          }),
        })
        const data = await res.json()
        console.log("Email sent via Brevo HTTPS API:", data)
        return data
      } catch (err) {
        console.error("Brevo API delivery error:", err.message)
      }
    }

    // 2. Standard SMTP (Port 587 STARTTLS) with fast 4s timeout
    const cleanPass = process.env.MAIL_PASS ? process.env.MAIL_PASS.replace(/\s+/g, "") : ""

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: cleanPass || process.env.MAIL_PASS,
      },
      connectionTimeout: 4000,
      greetingTimeout: 4000,
      socketTimeout: 6000,
      tls: {
        rejectUnauthorized: false,
      },
    })

    const info = await transporter.sendMail({
      from: `"StudyNotion - Online Education" <${process.env.MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    })

    console.log("Email info: ", info.response || info)
    return info
  } catch (error) {
    console.error("Error occurred while sending mail in mailSender: ", error.message)
    throw error
  }
}

module.exports = mailSender

