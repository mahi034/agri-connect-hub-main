import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { EMAIL } from "@/lib/contact";
import nodemailer from "nodemailer";

export const sendEnquiryEmail = createServerFn({ method: "POST" })
    .inputValidator(z.object({
        name: z.string(),
        phone: z.string(),
        interest: z.string(),
        message: z.string()
    }))
    .handler(async ({ data }) => {
        const smtpEmail = process.env.SMTP_EMAIL;
        const smtpPassword = process.env.SMTP_PASSWORD;
        const receiverEmail = process.env.RECEIVER_EMAIL || EMAIL;

        if (!smtpEmail || !smtpPassword) {
            console.error("Missing SMTP credentials in .env file");
            throw new Error("Email service is not configured properly.");
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: smtpEmail,
                pass: smtpPassword,
            },
        });

        const mailOptions = {
            from: `"Cropmak Website" <${smtpEmail}>`,
            to: receiverEmail, // Send to the configured receiver email
            subject: `New Enquiry: ${data.interest} from ${data.name}`,
            text: `You have received a new enquiry from the Cropmak website.\n\nDetails:\nName: ${data.name}\nPhone: ${data.phone}\nInterest: ${data.interest}\n\nMessage:\n${data.message}`,
            html: `
                <h3>New Enquiry from Cropmak Website</h3>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Interest:</strong> ${data.interest}</p>
                <p><strong>Message:</strong><br/>${data.message.replace(/\n/g, '<br/>')}</p>
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
            return { success: true, message: "Email sent successfully" };
        } catch (error) {
            console.error("Error sending email:", error);
            throw new Error("Failed to send email. Please try again later.");
        }
    });
