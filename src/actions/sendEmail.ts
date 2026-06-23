"use server";

import fs from "fs/promises";
import path from "path";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export async function sendContactEmail(name: string, email: string, message: string) {
  try {
    if (!name || !email || !message) {
      return { success: false, error: "All fields are required" };
    }

    const newMessage: ContactSubmission = {
      id: Math.random().toString(36).substring(2, 11),
      name,
      email,
      message,
      timestamp: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    };

    // Save locally to a JSON file in the project root workspace
    const filePath = path.join(process.cwd(), "messages.json");
    
    let messages: ContactSubmission[] = [];
    try {
      const data = await fs.readFile(filePath, "utf-8");
      messages = JSON.parse(data);
    } catch (e) {
      // File doesn't exist yet
    }

    messages.push(newMessage);
    await fs.writeFile(filePath, JSON.stringify(messages, null, 2), "utf-8");

    // Professional styled HTML Email Template
    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0f19; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);">
        <div style="background: linear-gradient(135deg, #00f2ff 0%, #3b82f6 100%); padding: 30px; text-align: center; border-bottom: 1px solid #1e293b;">
          <h2 style="margin: 0; font-size: 26px; font-weight: 800; color: #0a0a0a; letter-spacing: 0.5px; text-transform: uppercase;">
            New Connection Request
          </h2>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #0f172a; font-weight: 600; font-family: monospace;">
            [SYSTEM LOG: PORTFOLIO CONTACT MODULE]
          </p>
        </div>
        <div style="padding: 30px; color: #e2e8f0; line-height: 1.6;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; font-weight: bold; width: 100px; color: #00f2ff; text-transform: uppercase; font-size: 11px; font-family: monospace;">Sender:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #f8fafc; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; font-weight: bold; color: #00f2ff; text-transform: uppercase; font-size: 11px; font-family: monospace;">Email:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #f8fafc; font-size: 14px;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none; font-weight: 600;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; font-weight: bold; color: #00f2ff; text-transform: uppercase; font-size: 11px; font-family: monospace;">Timestamp:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 12px; font-family: monospace;">${newMessage.timestamp}</td>
            </tr>
          </table>
          <div style="background-color: #111827; border: 1px solid #1e293b; border-radius: 8px; padding: 20px; margin-top: 10px;">
            <div style="font-weight: bold; color: #00f2ff; text-transform: uppercase; font-size: 11px; font-family: monospace; margin-bottom: 8px;">Message:</div>
            <p style="margin: 0; color: #f1f5f9; font-size: 14px; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
        </div>
        <div style="background-color: #070a13; padding: 15px 30px; text-align: center; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b; font-family: monospace;">
          This message was routed securely via Next.js Server Actions.
        </div>
      </div>
    `;

    // Console log for server-side visibility
    console.log(`[Contact Submission] Saved message to messages.json from ${name} (${email})`);

    // SMTP forwarding credentials
    const user = process.env.SMTP_USER || process.env.GMAIL_USER;
    const pass = process.env.SMTP_PASSWORD || process.env.GMAIL_APP_PASSWORD;

    if (user && pass) {
      const nodemailer = require("nodemailer");
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass }
      });

      await transporter.sendMail({
        from: user,
        to: "ravindrans.dev@gmail.com",
        subject: `[Portfolio Connect] Message from ${name}`,
        html: htmlContent
      });
      console.log(`[Contact Submission] Email sent successfully to ravindrans.dev@gmail.com`);
    } else {
      console.warn(`[Contact Submission] SMTP credentials missing. Set GMAIL_USER and GMAIL_APP_PASSWORD to enable email sending.`);
    }

    return { success: true, message: "Your message has been sent successfully!" };
  } catch (error: any) {
    console.error("Error saving/sending message:", error);
    return { success: false, error: error.message || "Failed to process message." };
  }
}
