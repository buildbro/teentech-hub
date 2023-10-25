import { _contactForm_ } from "../../src/typeModel";
import nodemailer from 'nodemailer';

const hostSender = process.env.hostSender;
const hostPassword = process.env.hostPassword;
const hostEmail = process.env.hostEmail;
const _adminEmail = process.env.adminEmail;

// Send Email Verification Code
export default async (req: any, res: any) => {
    const contactForm: _contactForm_ = req.body;
    const adminEmail = _adminEmail || "info@buildbrothers.com";

    try {
        // const subject = `Contact Form - ${ contactForm.subject }`;
        const subject = `${ contactForm.subject }`;

        const htmlText = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title> Teen Tech Hub Contact Form Submission - ${ contactForm.subject } </title>
                <style>
                    h1 {
                        margin-bottom: 0;
                        padding-bottom: 0;
                    }
                </style>
            </head>
            <body>
                <section style="width: 100%; max-width: 600px; margin-left: auto; margin-right: auto; background-color: #80808033; padding: 20px;">
                    <main>
                        <b>Dear Admin,</b>
                        <p>
                            I hope this email finds you well.
                            We want to inform you that a user just dropped a message on your website.
                            Please find the details below:
                        </p>

                        <h1>Contact Form Submission</h1>

                        <p><strong>Name:</strong> ${ contactForm.name } </p>
                        <p><strong>Email:</strong> ${ contactForm.email } </p>
                        <p><strong>Subject:</strong> ${ contactForm.subject } </p>
                        <p><strong>Message:</strong> ${ contactForm.message } </p>
                    
                        <p>
                            This is a contact form submission from your website. 
                            Please review the details provided by the user and respond promptly.
                            <br />
                            This is an automated message, please do not reply.
                            <br />
                            <b>-Best regards.</b>
                        </p>
                        
                    </main>

                </section>
            </body>
            </html>
        `;

        const mailText = `
            Dear Admin, \n
            I hope this email finds you well. \n
            We want to inform you that a user just dropped a message on your website. \n
            Please find the details below:
            \n \n

            Name: ${ contactForm.name } \n
            Email: ${ contactForm.email } \n
            Phone Number: ${ contactForm.phoneNumber } \n
            Subject: ${ contactForm.subject } \n \n

            Message: ${ contactForm.message } \n
            \n \n

            This is a contact form submission from your website. 
            Please review the details provided by the user and respond promptly.
            \n \n

            This is an automated message, please do not reply.
            \n
            -Best regards.
        `;

        const details = {
            from: `"Teen Tech Hub" <${ hostEmail }>`,
            to: adminEmail, // who should recieve the mail
            replyTo: contactForm.email,
            subject: subject,
            text: mailText,
            html: htmlText
        };
        
        const mailTransporter = nodemailer.createTransport({
            // service: "gmail",
            host: hostSender,
            port: 465,
            secure: true,
            auth: {
                user: hostEmail,
                pass: hostPassword
            }
        });

        await mailTransporter.sendMail(details, (err: any) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    err,
                    message: 'an error occured while sending email',
                });
            }
        });
        
        return res.status(201).json({
            status: 201,
            message: 'message sent!'
        });
    } catch (error: any) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        // next(error);
        return res.status(error.statusCode).json({
            error: {
                message: error.message,
                data: error.data
            }
        });
    }
};
  