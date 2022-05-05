import { MailAdapter, SendMailData } from '../mail-adapter';
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "113c938299a575",
        pass: "667f9b183f1834"
    }
});
export class NodeMailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: "Equipe feedget <oi@feedget.com>",
            to: "Ismael  <ismael.sidney@outlook.com>",
            subject,
            html: body,
        })
    }
};

