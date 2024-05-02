import nodemailer, { Transporter, TransportOptions } from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

interface EmailData {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: EmailData): Promise<any> => {
  try {
    // Create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Update user model based on emailType
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Check if required environment variables are defined
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      throw new Error("SMTP configuration is incomplete");
    }

    // Check if SMTP_PORT is defined
    const smtpPort = process.env.SMTP_PORT;

    if (!smtpPort) {
      throw new Error("SMTP_PORT environment variable is not defined");
    }

    // Parse SMTP_PORT to ensure it's a number
    const port = parseInt(process.env.SMTP_PORT);

    // Create transporter
    const transporter: Transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: port, // Use the parsed port value
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    } as TransportOptions);

    // Compose email options
    const mailOptions: MailOptions = {
      from: '"Kabirs webApp 👻" <kabirshuvo19@gmail.com>',
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}
      </p>`,
    };

    // Send email
    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
