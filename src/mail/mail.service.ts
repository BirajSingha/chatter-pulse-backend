import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        // user: process.env.MAIL_ID,
        // pass: process.env.MAIL_PASS,
        user: 'wtsangularteam@gmail.com',
        pass: 'cswcoobgszcnprpu',
      },
    });
  }

  async sendVerificationCode(email: string, code: string) {
    await this.transporter.sendMail({
      from: '"No Reply" <wtsangularteam@gmail.com>', // Sender address
      to: email, // List of receivers
      subject: 'Welcome to the Chatter-Pulse! Verify your Email', // Subject line
      text: `Welcome! Please confirm your email using the verification code.`,
      html: `<b>Welcome!</b><br>Please confirm your email by using the verification code. Your verification code is: ${code} `, // HTML body
    });
  }

  async sendNewPassword(email: string, password: string) {
    await this.transporter.sendMail({
      from: '"No Reply" <wtsangularteam@gmail.com>', // Sender address
      to: email, // List of receivers
      subject: 'Welcome to the Chatter-Pulse! Forgot Password', // Subject line
      text: `Congratulations! Your password has been changed successfully.`,
      html: `<b>Congratulations!</b><br>Your password has been changed successfully. Your new password is: ${password} `, // HTML body
    });
  }
}
