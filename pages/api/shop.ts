import { _customersType_, _ordersType_, _productsType_ } from "../../src/typeModel";
import nodemailer from 'nodemailer';

const hostSender = process.env.hostSender;
const hostPassword = process.env.hostPassword;
const hostEmail = process.env.hostEmail;
const _adminEmail = process.env.adminEmail;
 
// Send Email Verification Code
export default async (req: any, res: any) => {
    const order: _ordersType_ = req.body;
    const adminEmail = _adminEmail || "info@buildbrothers.com";

    try {
        const subject = `New Order from ${ order.customer.name }`;

        const htmlText = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Order from ${ order.customer.name } </title>
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
                            We want to inform you that a new order has been placed on our website.
                            Please find the order details below:
                        </p>

                        <h1> Customer Information: </h1>
                        <ul>
                            <li><b>Order Id: </b> ${ order.id } </li>
                            <li><b>Order Date: </b> ${ order.createdAt } </li>
                            <li><b>Customer Name: </b> ${ order.customer.name } </li>
                            <li><b>Customer Email: </b> ${ order.customer.email } </li>
                            <li><b>Customer Phone Number: </b> ${ order.customer.phoneNumber } </li>
                        </ul>

                        <h1> Shipping Information: </h1>
                        <ul>
                            <li><b>Shipping Address: </b> ${ order.customer.address } </li>
                            <li><b>Region: </b> ${ order.customer.region } </li>
                            <li><b>Country: </b> ${ order.customer.country } </li>
                        </ul>

                        <h1> Order Details: </h1>
                        ${ order.products.map((element, index) => {
                            return `
                                <h3> Product ${ index + 1 } </h3>
                                <div>
                                    <img src="${ element.images[0] }" alt="${ element.name }" style="max-height: 120px; width: auto;" />
                                </div>
                                <ul>
                                    <li><b>Product Id: </b> ${ element.id } </li>
                                    <li><b>Product Name: </b> ${ element.name } </li>
                                    <li><b>Quantity: </b> ${ element.count } </li>
                                    <li>
                                        <b>Price: </b> 
                                        ${ 
                                            Intl.NumberFormat('en-NG', {
                                              style: 'currency',
                                              currency: 'NGN',
                                              maximumFractionDigits: 0,
                                            }).format(element.price)
                                        }
                                    </li>
                                    <li><b>Product Description: </b> ${ element.description } </li>
                                </ul>
                            `;
                        }) }

                        <br />

                        <p>
                            Please review this order at your earliest convenience. 
                            If you have any questions or need additional information, 
                            please do not hesitate to contact us.
                        </p>

                        <p>
                            Thank you for your prompt attention to this matter.
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
            I hope this email finds you well.
            We wanted to inform you that a new order has been placed on our website.
            Please find the order details below:
            \n \n

            Customer Information: \n \n
            Order Id: ${ order.id } \n
            Order Date: ${ order.createdAt } \n
            Customer Name: ${ order.customer.name } \n
            Customer Email: ${ order.customer.email } \n
            Customer Phone Number: ${ order.customer.phoneNumber } \n
            \n \n

            Shipping Information: \n \n
            Shipping Address: ${ order.customer.address } \n
            Region: ${ order.customer.region } \n
            Country: ${ order.customer.country }\n
            \n \n

            Order Details: \n
            ${ order.products.map((element, index) => {
                return `
                    Product ${ index + 1 } \n \n

                    Id: ${ element.id } \n
                    Name: ${ element.name } \n
                    Quantity: ${ element.count } \n
                    Price: ${ 
                        Intl.NumberFormat('en-NG', {
                          style: 'currency',
                          currency: 'NGN',
                          maximumFractionDigits: 0,
                        }).format(element.price)
                    } \n
                    Description: ${ element.description }
                `;
            }) }
            \n \n

            Please review this order at your earliest convenience.
            If you have any questions or need additional information,
            please do not hesitate to contact us. 
            \n \n

            Thank you for your prompt attention to this matter.
            \n \n

            This is an automated message, please do not reply.
            \n
            -Best regards.
        `;

        const details = {
            from: `"Teen Tech Hub" <${ hostEmail }>`,
            to: adminEmail, // who should recieve the mail
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

    // res.send(JSON.stringify(events));
};
  