export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <title>Verify Your Email</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background-color: #f2f4f6;
      color: #333;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    .email-header {
      background-color: #22D172;
      padding: 24px;
      text-align: center;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
    }
    .email-body {
      padding: 32px 24px;
      font-size: 15px;
      line-height: 1.6;
    }
    .otp-box {
      display: inline-block;
      background: #22D172;
      color: white;
      padding: 14px 28px;
      font-weight: bold;
      font-size: 20px;
      letter-spacing: 2px;
      border-radius: 8px;
      margin: 24px 0;
    }
    .email-footer {
      background: #f7f7f7;
      padding: 16px;
      text-align: center;
      font-size: 12px;
      color: #888;
    }
    @media screen and (max-width: 480px) {
      .email-body {
        padding: 24px 16px;
      }
      .otp-box {
        font-size: 18px;
        padding: 12px 24px;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-header">
      Verify Your Email
    </div>
    <div class="email-body">
      <p>Hello,</p>
      <p>You're almost set! Please verify your account using the OTP below for the email: <strong style="color:#4C83EE">{{email}}</strong>.</p>
      <div class="otp-box">{{otp}}</div>
      <p>This OTP will expire in 24 hours.</p>
      <p>If you didn't request this, please ignore this message.</p>
    </div>
    <div class="email-footer">
      &copy; 2025 Peterpan IT Solution. All rights reserved.
    </div>
  </div>
</body>
</html>
`;



export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <title>Password Reset</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background-color: #f2f4f6;
      color: #333;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    .email-header {
      background-color: #ff6b6b;
      padding: 24px;
      text-align: center;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
    }
    .email-body {
      padding: 32px 24px;
      font-size: 15px;
      line-height: 1.6;
    }
    .otp-box {
      display: inline-block;
      background: #ff6b6b;
      color: white;
      padding: 14px 28px;
      font-weight: bold;
      font-size: 20px;
      letter-spacing: 2px;
      border-radius: 8px;
      margin: 24px 0;
    }
    .email-footer {
      background: #f7f7f7;
      padding: 16px;
      text-align: center;
      font-size: 12px;
      color: #888;
    }
    @media screen and (max-width: 480px) {
      .email-body {
        padding: 24px 16px;
      }
      .otp-box {
        font-size: 18px;
        padding: 12px 24px;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-header">
      Reset Your Password
    </div>
    <div class="email-body">
      <p>Hello,</p>
      <p>We received a request to reset the password for the account associated with: <strong style="color:#4C83EE">{{email}}</strong>.</p>
      <p>Use the OTP below to proceed with the password reset:</p>
      <div class="otp-box">{{otp}}</div>
      <p>This OTP is valid for only 15 minutes.</p>
      <p>If you didn’t request this, you can safely ignore this email.</p>
    </div>
    <div class="email-footer">
      &copy; 2025 Peterpan IT Solution. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
