<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;padding:32px;background:#f9fafb;">
  <div style="max-width:400px;margin:auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e5e7eb;">
    <h2 style="margin:0 0 8px;color:#111827;">Your Login OTP</h2>
    <p style="color:#6b7280;margin:0 0 24px;">Use the code below to complete your sign in. It expires in 10 minutes.</p>
    <div style="font-size:36px;font-weight:700;letter-spacing:8px;color:#4f46e5;text-align:center;padding:16px;background:#eef2ff;border-radius:8px;">
      {{ $otp }}
    </div>
    <p style="color:#9ca3af;font-size:12px;margin-top:24px;">If you didn't try to log in, ignore this email.</p>
  </div>
</body>
</html>