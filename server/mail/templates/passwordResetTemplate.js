const passwordResetTemplate = (url, name = "Valued Learner") => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - StudyNotion</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #000814;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #F1F2FF;
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
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
    }
    .header {
      background-color: #000814;
      padding: 24px;
      text-align: center;
      border-bottom: 1px solid #2C3E50;
    }
    .logo {
      max-width: 170px;
      height: auto;
    }
    .banner-img {
      width: 100%;
      max-height: 220px;
      object-fit: cover;
      display: block;
    }
    .content {
      padding: 36px 32px;
      text-align: left;
    }
    .greeting {
      font-size: 22px;
      font-weight: 700;
      color: #F1F2FF;
      margin-bottom: 16px;
    }
    .description {
      font-size: 15px;
      line-height: 1.6;
      color: #AFB2BF;
      margin-bottom: 24px;
    }
    .btn-container {
      text-align: center;
      margin: 32px 0;
    }
    .btn {
      display: inline-block;
      background-color: #FFD60A;
      color: #000814 !important;
      font-size: 16px;
      font-weight: 700;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(255, 214, 10, 0.3);
    }
    .link-alt {
      background-color: #000814;
      border: 1px solid #2C3E50;
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 12px;
      color: #FFD60A;
      word-break: break-all;
      margin-top: 16px;
    }
    .notice {
      font-size: 13px;
      color: #838894;
      line-height: 1.5;
      margin-top: 24px;
      border-top: 1px solid #2C3E50;
      padding-top: 20px;
    }
    .footer {
      background-color: #000814;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #6E727F;
      border-top: 1px solid #2C3E50;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <a href="https://studynotion.com" target="_blank" style="text-decoration: none;">
          <img
            class="logo"
            src="https://raw.githubusercontent.com/Shivamp1819/StudyNotion-LMS/main/src/assets/Logo/Logo-Full-Light.png"
            alt="StudyNotion Logo"
            width="180"
            style="max-width: 180px; height: auto; display: block; margin: 0 auto; border: 0;"
          />
        </a>
      </div>
      
      <img class="banner-img" src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&auto=format&fit=crop&q=80" alt="StudyNotion Workspace" />

      <div class="content">
        <div class="greeting">Password Reset Request 🔐</div>
        <p class="description">
          Hello ${name},<br/><br/>
          We received a request to reset your password for your <strong>StudyNotion</strong> account. Click the button below to choose a new, secure password:
        </p>

        <div class="btn-container">
          <a class="btn" href="${url}" target="_blank">Reset Password &rarr;</a>
        </div>

        <p class="description" style="font-size: 13px; margin-bottom: 8px;">
          Or copy and paste this link into your browser:
        </p>
        <div class="link-alt">
          <a href="${url}" style="color: #FFD60A; text-decoration: none;">${url}</a>
        </div>

        <div class="notice">
          ⏱️ <strong>This reset link will expire in 1 hour.</strong><br/>
          If you did not request a password reset, you can safely disregard this email. Your password will remain unchanged.
        </div>
      </div>

      <div class="footer">
        Questions? Reach us at <a href="mailto:info@studynotion.com" style="color: #FFD60A; text-decoration: none;">info@studynotion.com</a><br/>
        &copy; 2025 StudyNotion. All rights reserved.
      </div>
    </div>
  </div>
</body>
</html>`
}

module.exports = passwordResetTemplate

