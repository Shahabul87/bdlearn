import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to get the appropriate domain
const getDomain = () => {
  const isProd = process.env.NODE_ENV === 'production';
  return isProd ? 'https://bdgenai.com' : 'http://localhost:3000';
};

const domain = process.env.NEXT_PUBLIC_APP_URL || getDomain();

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "mail@bdgenai.com",
      to: email,
      subject: "2FA Code for Login",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2; margin-bottom: 20px;">Your Two-Factor Authentication Code</h2>
          <p style="font-size: 16px; margin-bottom: 20px;">Your verification code is:</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px;">
            ${token}
          </div>
          <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
            This code will expire in 5 minutes. If you didn't request this code, please ignore this email.
          </p>
        </div>
      `
    });

    if (error) {
      console.error("Resend API Error:", error);
      return;
    }

    return data;
  } catch (error) {
    console.error("Detailed error:", error);
    return null;
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  
  try {
    await resend.emails.send({
      from: "mail@bdgenai.com",
      to: email,
      subject: "Reset Your Password - bdGenAI",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2; margin-bottom: 20px;">Reset Your Password</h2>
          <p style="font-size: 16px; margin-bottom: 20px;">
            Click the link below to reset your password:
          </p>
          <a href="${resetLink}" 
             style="display: inline-block; background: linear-gradient(to right, #0891b2, #8b5cf6); 
                    color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; 
                    font-weight: bold;">
            Reset Password
          </a>
          <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
            Or copy this URL: ${resetLink}
          </p>
          <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
            This link will expire in 1 hour.
          </p>
        </div>
      `
    });
  } catch (error) {
    console.error("Reset email error:", error);
  }
};

export const sendVerificationEmail = async (
  email: string, 
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  try {
    await resend.emails.send({
      from: "mail@bdgenai.com",
      to: email,
      subject: "Verify Your Email - bdGenAI",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2; margin-bottom: 20px;">Verify Your Email Address</h2>
          <p style="font-size: 16px; margin-bottom: 20px;">
            Thank you for registering with bdGenAI. Please click the button below to verify your email address:
          </p>
          <a href="${confirmLink}" 
             style="display: inline-block; background: linear-gradient(to right, #0891b2, #8b5cf6); 
                    color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; 
                    font-weight: bold;">
            Verify Email
          </a>
          <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
            This link will expire in 1 hour. If you didn't create an account with us, please ignore this email.
          </p>
        </div>
      `
    });
  } catch (error) {
    console.error("Verification email error:", error);
  }
};