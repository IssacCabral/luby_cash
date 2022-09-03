import nodemailer, { Transporter } from 'nodemailer'
import env from './env'

const transporter_config: Transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
        user: env.SMTP_USERNAME, // generated ethereal user
        pass: env.SMTP_PASSWORD, // generated ethereal password
    },
});

export default transporter_config