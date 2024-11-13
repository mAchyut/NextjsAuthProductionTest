import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }:any) => {
  try {
    // Hash the userId to create a token for verification/reset
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Set the expiration time for the token (1 hour from now)
    const tokenExpiry = Date.now() + 3600000;

    // Update user document based on the email type
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        { $set: { verifyToken: hashedToken, verifyTokenExpiry: tokenExpiry } },
        { new: true }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        { $set: { forgotPassword: hashedToken, forgotPasswordTokenExpiry: tokenExpiry } },
        { new: true }
      );
    }

    // Configure Nodemailer transporter with Mailtrap credentials from environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST || "sandbox.smtp.mailtrap.io",
      port: parseInt(process.env.MAILTRAP_PORT!, 10) || 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    // Set email subject and body based on email type
    const mailOptions = {
      from: 'nexcliphelp@gmail.com',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}, or copy and paste the link below in your browser:<br/>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error:any) {
    throw new Error(error?.message);
  }
};
