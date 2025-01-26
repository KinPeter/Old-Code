import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import { CustomApiError } from './custom-errors';

class EmailData {
  public from = `"TripPlanner" <${process.env.TP_EMAIL_USER}>`;
  constructor(public to: string, public subject: string, public text: string, public html: string) {}
}

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.TP_EMAIL_USER,
        pass: process.env.TP_EMAIL_PASS,
      },
    });
  }

  async sendPasswordResetEmail(name: string, email: string, resetToken: string): Promise<any> {
    const subject = 'Reset your password for TripPlanner';
    const resetLink = `${process.env.TP_FRONTEND_URL}/auth/reset-password/${encodeURI(email)}/${resetToken}`;
    const text = this.getPasswordResetTextEmailTemplate(name, resetLink);
    const html = this.getPasswordResetHtmlEmailTemplate(name, resetLink);
    const data = new EmailData(email, subject, text, html);
    return await this.sendMail(data);
  }

  private async sendMail(emailData: EmailData): Promise<any> {
    try {
      const info = await this.transporter.sendMail(emailData);
      return info;
    } catch (error) {
      throw new ServiceUnavailableException(CustomApiError.UNABLE_TO_SEND, error);
    }
  }

  private getPasswordResetHtmlEmailTemplate(name: string, resetLink: string): string {
    return `
    <h3>Dear ${name},</h3>
    <p>Hello from <b>TripPlanner!</b></p>
    <p>You requested to reset your password, you can do so by clicking the link below within the next 6 hours.</p>
    <p><a href="${resetLink}" target="_blank">Reset my password now</a></p>
    `;
  }

  private getPasswordResetTextEmailTemplate(name: string, resetLink: string): string {
    return `
    Dear ${name},

    Hello from TripPlanner!

    You requested to reset your password, you can do so by clicking the link below within the next 6 hours.

    ${resetLink}
    `;
  }
}
