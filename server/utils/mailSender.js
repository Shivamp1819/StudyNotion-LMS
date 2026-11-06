const nodemailer = require("nodemailer")
const https = require("https")

const sendViaHttpsBridge = (payload) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload)
    const options = {
      hostname: "study-notion-lms-gules.vercel.app",
      port: 443,
      path: "/api/send-mail",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
      },
      timeout: 10000,
    }

    const req = https.request(options, (res) => {
      let body = ""
      res.on("data", (chunk) => (body += chunk))
      res.on("end", () => {
        try {
          const parsed = JSON.parse(body)
          if (parsed.success) {
            resolve(parsed)
          } else {
            reject(new Error(parsed.error || parsed.message || "Failed"))
          }
        } catch (e) {
          reject(e)
        }
      })
    })

    req.on("error", reject)
    req.on("timeout", () => {
      req.destroy()
      reject(new Error("Bridge connection timeout"))
    })

    req.write(data)
    req.end()
  })
}

const mailSender = async (email, title, body) => {
  // 1. Try Vercel HTTPS Bridge (Port 443 - Bypasses cloud host SMTP port blocks)
  try {
    const bridgeResult = await sendViaHttpsBridge({ email, title, body })
    console.log("Email sent successfully via Vercel HTTPS bridge:", bridgeResult)
    return bridgeResult
  } catch (bridgeErr) {
    console.warn("Vercel bridge notice:", bridgeErr.message)
  }

  // 2. Direct SMTP fallback (Works on localhost and environments with open SMTP ports)
  const mailUser = process.env.MAIL_USER || "mrspsidhauli@gmail.com"
  const cleanPass = (process.env.MAIL_PASS || "gyut qfvt gfgs rreh").replace(/\s+/g, "")

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
