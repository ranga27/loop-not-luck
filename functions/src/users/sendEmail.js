import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'ranga27383@gmail.com',
        pass: 'Envy2020',
    }
});

export const sendEmail = ({ to, from, subject, message }) => {
    const mailOptions = {
        to,
        from,
        subject,
        text: message,
    };

    return transporter.sendMail(mailOptions);
}