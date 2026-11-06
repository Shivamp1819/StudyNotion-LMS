const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your StudyNotion Verification Code</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #000814;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #F1F2FF;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #000814;
      padding: 40px 0;
    }
    .card {
      max-width: 600px;
      margin: 0 auto;
      background-color: #161D29;
      border: 1px solid #2C3E50;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.65);
    }
    .header {
      background-color: #000814;
      padding: 26px;
      text-align: center;
      border-bottom: 1px solid #2C3E50;
    }
    .logo {
      max-width: 180px;
      height: auto;
      display: inline-block;
    }
    .banner-img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      display: block;
      border-bottom: 1px solid #2C3E50;
    }
    .content {
      padding: 36px 32px;
      text-align: left;
    }
    .greeting {
      font-size: 24px;
      font-weight: 700;
      color: #F1F2FF;
      margin-bottom: 14px;
    }
    .highlight-brand {
      color: #FFD60A;
    }
    .about-box {
      background-color: #0A111E;
      border-left: 4px solid #FFD60A;
      border-radius: 8px;
      padding: 16px 20px;
      margin-bottom: 24px;
    }
    .about-text {
      font-size: 14px;
      line-height: 1.6;
      color: #C5C7D0;
      margin: 0;
    }
    .instructions {
      font-size: 15px;
      line-height: 1.6;
      color: #AFB2BF;
      margin-bottom: 24px;
    }
    .otp-section {
      text-align: center;
      margin: 30px 0;
    }
    .otp-label {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #999DAA;
      margin-bottom: 10px;
    }
    .otp-badge {
      display: inline-block;
      background: #000814;
      border: 2px dashed #FFD60A;
      border-radius: 14px;
      padding: 18px 36px;
      font-family: 'Courier New', Courier, monospace;
      font-size: 38px;
      font-weight: 800;
      letter-spacing: 12px;
      color: #FFD60A;
      text-shadow: 0 0 15px rgba(255, 214, 10, 0.4);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }
    .otp-timer {
      font-size: 13px;
      color: #FFE83D;
      font-weight: 600;
      margin-top: 12px;
    }
    .security-note {
      background-color: #000814;
      border: 1px solid #2C3E50;
      border-radius: 10px;
      padding: 16px 20px;
      font-size: 13px;
      color: #838894;
      line-height: 1.5;
      margin-top: 26px;
    }
    .security-note strong {
      color: #F1F2FF;
    }
    .signature {
      margin-top: 28px;
      font-size: 14px;
      color: #AFB2BF;
      line-height: 1.5;
    }
    .signature-name {
      color: #F1F2FF;
      font-weight: 700;
      font-size: 15px;
    }
    .footer {
      background-color: #000814;
      padding: 24px;
      text-align: center;
      font-size: 12px;
      color: #6E727F;
      border-top: 1px solid #2C3E50;
      line-height: 1.6;
    }
    .footer a {
      color: #FFD60A;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <!-- Logo Header -->
      <div class="header">
        <a href="https://studynotion.com" target="_blank" style="text-decoration: none;">
          <img
            class="logo"
            src="https://iili.io/nt2FEvf.png"
            alt="StudyNotion Logo"
            width="180"
            style="max-width: 180px; height: auto; display: block; margin: 0 auto; border: 0;"
          />
        </a>
      </div>

      <!-- Educational Visual Banner -->
      <img
        class="banner-img"
        src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&auto=format&fit=crop&q=80"
        alt="StudyNotion Learning Platform"
      />

      <!-- Main Body -->
      <div class="content">
        <div class="greeting">
          Welcome to <span class="highlight-brand">StudyNotion</span>! 🚀
        </div>

        <!-- About StudyNotion -->
        <div class="about-box">
          <p class="about-text">
            <strong>About StudyNotion:</strong> We are a next-generation online education platform dedicated to empowering developers and engineers. Learn industry-leading web development, AI, Python, and cloud engineering with hands-on sandboxes and real-world projects.
          </p>
        </div>

        <p class="instructions">
          Thank you for joining our community! To verify your email address and activate your account, please enter the One-Time Password (OTP) below:
        </p>

        <!-- OTP Code Box -->
        <div class="otp-section">
          <div class="otp-label">Your Verification Code</div>
          <div class="otp-badge">${otp}</div>
          <div class="otp-timer">⏳ Valid for 5 minutes only</div>
        </div>

        <!-- Security Notice -->
        <div class="security-note">
          🔒 <strong>Security Notice:</strong> Never share this code with anyone. StudyNotion team members will never ask for your OTP or password. If you did not create an account, you can safely ignore this message.
        </div>

        <div class="signature">
          Happy Learning,<br/>
          <span class="signature-name">The StudyNotion Team</span>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        Need assistance? Reach our support team at <a href="mailto:info@studynotion.com">info@studynotion.com</a><br/>
        &copy; 2025 StudyNotion. All rights reserved. • Building the future of technical education.
      </div>
    </div>
  </div>
</body>
</html>`
}

module.exports = otpTemplate
