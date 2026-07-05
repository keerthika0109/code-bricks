<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class LoginOtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public string $otp) {}

    public function build(): self
    {
        return $this
            ->subject('Your CodeBricks OTP')
            ->html("
                <div style='font-family:sans-serif;padding:32px;'>
                    <h2>Your CodeBricks OTP</h2>
                    <p>Use this code to complete your registration. It expires in 10 minutes.</p>
                    <div style='font-size:36px;font-weight:bold;letter-spacing:8px;color:#4f46e5;padding:16px;background:#eef2ff;border-radius:8px;text-align:center;'>
                        {$this->otp}
                    </div>
                    <p style='color:#9ca3af;font-size:12px;margin-top:24px;'>If you didn't request this, ignore this email.</p>
                </div>
            ");
    }
}