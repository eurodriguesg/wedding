import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config(); // <- garanta que está aqui

const transporter = nodemailer.createTransport({

  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // false para porta 587, true para porta 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Teste de conexão
transporter.verify((error, success) => {
  if (error) {
    console.error('Erro ao conectar ao servidor SMTP:', error);
  } else {
    console.log('Servidor SMTP está pronto para enviar e-mails');
  }
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {

    console.log('Envio:', {
      to: to,
      subject: subject,
      html: html
    });

    console.log('SMTP Config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS ? '******' : 'undefined',
    });

    const info = await transporter.sendMail({
      from: `"Eliseu & Dagna 👰🤵" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log('E-mail enviado:', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw error;
  }
};