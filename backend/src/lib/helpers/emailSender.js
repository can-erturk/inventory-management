import nodemailer from 'nodemailer';
import getEnv from './getEnv.js';

const SENDER_EMAIL_ADDRESS = getEnv('SENDER_EMAIL_ADDRESS');
const SENDER_EMAIL_PASSWORD = getEnv('SENDER_EMAIL_PASSWORD');

export default async function emailSender(sendTo, subject, html) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.yandex.com',
      port: 465,
      secure: true,
      auth: {
        user: SENDER_EMAIL_ADDRESS,
        pass: SENDER_EMAIL_PASSWORD,
      },
    });

    return await transporter.sendMail({
      from: SENDER_EMAIL_ADDRESS,
      to: sendTo,
      subject,
      html,
    });
  } catch (error) {
    return error;
  }
}
