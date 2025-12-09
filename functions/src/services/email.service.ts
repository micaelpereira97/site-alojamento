import * as nodemailer from 'nodemailer';
import { defineString } from 'firebase-functions/params';

// Environment variables for email
const gmailUser = defineString('GMAIL_USER');
const gmailAppPassword = defineString('GMAIL_APP_PASSWORD');

export class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    const user = gmailUser.value();
    const pass = gmailAppPassword.value();

    if (user && pass && user !== 'YOUR_GMAIL@gmail.com') {
      this.transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user,
          pass,
        },
      });
    }
  }

  async sendBookingConfirmation(booking: any): Promise<void> {
    if (!this.transporter) {
      console.warn('Email service not configured, skipping email');
      return;
    }

    const mailOptions = {
      from: gmailUser.value(),
      to: booking.guestEmail,
      subject: `Confirmação de Reserva - ${booking.unitName}`,
      html: `
        <h2>🌿 Reserva Confirmada - Recanto da Natureza</h2>
        <p>Olá <strong>${booking.guestName}</strong>,</p>
        <p>A sua reserva foi confirmada com sucesso!</p>

        <h3>Detalhes da Reserva:</h3>
        <ul>
          <li><strong>Unidade:</strong> ${booking.unitName}</li>
          <li><strong>Check-in:</strong> ${new Date(booking.checkIn).toLocaleDateString('pt-PT')}</li>
          <li><strong>Check-out:</strong> ${new Date(booking.checkOut).toLocaleDateString('pt-PT')}</li>
          <li><strong>Noites:</strong> ${booking.nights}</li>
          <li><strong>Valor Total:</strong> €${booking.totalPrice}</li>
        </ul>

        ${booking.notes ? `<p><strong>Observações:</strong> ${booking.notes}</p>` : ''}

        <p>Aguardamos a sua chegada!</p>
        <p>Qualquer dúvida, não hesite em contactar-nos.</p>

        <p>Com os melhores cumprimentos,<br/>
        <strong>Recanto da Natureza</strong><br/>
        Serra da Lousã, Portugal</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Confirmation email sent to:', booking.guestEmail);
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  }

  async notifyOwner(booking: any): Promise<void> {
    if (!this.transporter) {
      console.warn('Email service not configured, skipping email');
      return;
    }

    const mailOptions = {
      from: gmailUser.value(),
      to: gmailUser.value(), // Send to owner
      subject: `🔔 Nova Reserva - ${booking.unitName}`,
      html: `
        <h2>Nova Reserva Recebida</h2>

        <h3>Detalhes da Reserva:</h3>
        <ul>
          <li><strong>Unidade:</strong> ${booking.unitName}</li>
          <li><strong>Hóspede:</strong> ${booking.guestName}</li>
          <li><strong>Email:</strong> ${booking.guestEmail}</li>
          <li><strong>Telefone:</strong> ${booking.guestPhone}</li>
          <li><strong>Check-in:</strong> ${new Date(booking.checkIn).toLocaleDateString('pt-PT')}</li>
          <li><strong>Check-out:</strong> ${new Date(booking.checkOut).toLocaleDateString('pt-PT')}</li>
          <li><strong>Noites:</strong> ${booking.nights}</li>
          <li><strong>Valor Total:</strong> €${booking.totalPrice}</li>
        </ul>

        ${booking.notes ? `<p><strong>Observações do Hóspede:</strong> ${booking.notes}</p>` : ''}

        <p>Um evento foi criado no Google Calendar.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Owner notification sent');
    } catch (error) {
      console.error('Error sending owner notification:', error);
    }
  }
}

export const emailService = new EmailService();
