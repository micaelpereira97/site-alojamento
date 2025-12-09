import * as nodemailer from 'nodemailer';
import { defineString } from 'firebase-functions/params';
import {
  generateGuestConfirmationEmail,
  generateGuestConfirmationText,
  generateOwnerNotificationEmail,
  generateOwnerNotificationText,
  type BookingEmailData
} from '../utils/email-templates';

// Environment variables for email
const gmailUser = defineString('GMAIL_USER');
const gmailAppPassword = defineString('GMAIL_APP_PASSWORD');
const ownerEmail = defineString('OWNER_EMAIL', { default: 'mica.orlando@hotmail.com' });

export interface BookingData {
  unitId: string;
  unitName: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: Date | string;
  checkOut: Date | string;
  nights: number;
  totalPrice: number;
  notes?: string;
  confirmationCode?: string;
  status?: 'pending' | 'confirmed';
  capacity?: number;
}

export class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private websiteUrl: string = process.env.WEBSITE_URL || 'http://localhost:3000';

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
    } else {
      console.warn('Email service not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.');
    }
  }

  private formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  private prepareEmailData(booking: BookingData): BookingEmailData {
    return {
      guestName: booking.guestName,
      guestEmail: booking.guestEmail,
      guestPhone: booking.guestPhone,
      unitName: booking.unitName,
      checkIn: this.formatDate(booking.checkIn),
      checkOut: this.formatDate(booking.checkOut),
      nights: booking.nights,
      guests: booking.capacity || 2,
      totalPrice: booking.totalPrice,
      confirmationCode: booking.confirmationCode || 'N/A',
      status: booking.status || 'pending',
      notes: booking.notes,
      websiteUrl: this.websiteUrl,
    };
  }

  /**
   * Send booking confirmation email to guest
   */
  async sendBookingConfirmation(booking: BookingData): Promise<void> {
    if (!this.transporter) {
      console.warn('Email service not configured, skipping confirmation email');
      return;
    }

    const emailData = this.prepareEmailData(booking);
    const htmlContent = generateGuestConfirmationEmail(emailData);
    const textContent = generateGuestConfirmationText(emailData);

    const statusText = booking.status === 'confirmed' ? 'Confirmada' : 'Recebida';
    const subject = `✅ Reserva ${statusText} - ${booking.unitName} | Recanto da Natureza`;

    const mailOptions = {
      from: {
        name: 'Recanto da Natureza',
        address: gmailUser.value()
      },
      to: booking.guestEmail,
      subject: subject,
      html: htmlContent,
      text: textContent,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Confirmation email sent to: ${booking.guestEmail} (Status: ${booking.status})`);
    } catch (error) {
      console.error('❌ Error sending confirmation email:', error);
      throw error;
    }
  }

  /**
   * Send booking notification to owner
   */
  async notifyOwner(booking: BookingData): Promise<void> {
    if (!this.transporter) {
      console.warn('Email service not configured, skipping owner notification');
      return;
    }

    const emailData = this.prepareEmailData(booking);
    const htmlContent = generateOwnerNotificationEmail(emailData);
    const textContent = generateOwnerNotificationText(emailData);

    const subject = `🔔 Nova Reserva - ${booking.unitName} | ${emailData.confirmationCode}`;

    const mailOptions = {
      from: {
        name: 'Sistema de Reservas',
        address: gmailUser.value()
      },
      to: ownerEmail.value(),
      subject: subject,
      html: htmlContent,
      text: textContent,
      priority: 'high' as const,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Owner notification sent to: ${ownerEmail.value()}`);
    } catch (error) {
      console.error('❌ Error sending owner notification:', error);
      throw error;
    }
  }

  /**
   * Send booking confirmation status update
   */
  async sendBookingStatusUpdate(
    booking: BookingData,
    newStatus: 'confirmed' | 'cancelled'
  ): Promise<void> {
    const updatedBooking = { ...booking, status: newStatus };
    await this.sendBookingConfirmation(updatedBooking);
  }
}

export const emailService = new EmailService();
