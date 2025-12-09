import { google } from 'googleapis';
import { defineString } from 'firebase-functions/params';

// Environment variable for Google Calendar credentials
const calendarCredentials = defineString('GOOGLE_CALENDAR_CREDENTIALS');

export class CalendarService {
  private calendar: any = null;

  constructor() {
    try {
      const credentials = calendarCredentials.value();
      if (credentials && credentials !== 'YOUR_SERVICE_ACCOUNT_JSON_HERE') {
        const auth = new google.auth.GoogleAuth({
          credentials: JSON.parse(credentials),
          scopes: ['https://www.googleapis.com/auth/calendar'],
        });
        this.calendar = google.calendar({ version: 'v3', auth });
      }
    } catch (error) {
      console.error('Calendar Service initialization error:', error);
    }
  }

  async getEvents(calendarId: string, startDate: Date, endDate: Date): Promise<any[]> {
    if (!this.calendar) {
      console.warn('Calendar service not initialized, returning empty events');
      return [];
    }

    try {
      const response = await this.calendar.events.list({
        calendarId,
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      });

      return response.data.items || [];
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      return [];
    }
  }

  async createEvent(calendarId: string, eventData: {
    summary: string;
    description: string;
    startDate: Date;
    endDate: Date;
    guestEmail: string;
  }): Promise<any> {
    if (!this.calendar) {
      throw new Error('Calendar service not initialized');
    }

    try {
      const event = {
        summary: eventData.summary,
        description: eventData.description,
        start: {
          date: eventData.startDate.toISOString().split('T')[0],
          timeZone: 'Europe/Lisbon',
        },
        end: {
          date: eventData.endDate.toISOString().split('T')[0],
          timeZone: 'Europe/Lisbon',
        },
        attendees: [
          { email: eventData.guestEmail },
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 1 day before
            { method: 'popup', minutes: 60 }, // 1 hour before
          ],
        },
      };

      const response = await this.calendar.events.insert({
        calendarId,
        resource: event,
        sendUpdates: 'all', // Send email notifications
      });

      return response.data;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw new Error('Failed to create calendar event');
    }
  }
}

export const calendarService = new CalendarService();
