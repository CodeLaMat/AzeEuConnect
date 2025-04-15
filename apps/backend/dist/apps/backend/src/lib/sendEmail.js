import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
    path: path.resolve(__dirname, "../../.env"),
});
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
export const sendEmail = async (to, subject, html) => {
    await transporter.sendMail({
        from: `"AzeEU Support" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });
};
