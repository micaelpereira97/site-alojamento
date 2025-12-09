import { onRequest } from 'firebase-functions/v2/https';
import { onCall } from 'firebase-functions/v2/https';
import * as cors from 'cors';
import { db } from './config/firebase';
import { geminiService } from './services/gemini.service';
import { calendarService } from './services/calendar.service';
import { emailService } from './services/email.service';
import {
  bookingSchema,
  chatMessageSchema,
  availabilitySchema,
  type BookingInput,
  type ChatMessageInput,
  type AvailabilityInput
} from './validators/schemas';

// CORS configuration
const corsHandler = cors({ origin: true });

/**
 * Get all active units
 * GET /getUnits
 */
export const getUnits = onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const unitsSnapshot = await db.collection('units')
        .where('isActive', '==', true)
        .get();

      const units = unitsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      res.json({ success: true, data: units });
    } catch (error: any) {
      console.error('Error fetching units:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch units'
      });
    }
  });
});

/**
 * Check availability for a specific unit
 * POST /checkAvailability
 * Body: { unitId, startDate, endDate }
 */
export const checkAvailability = onCall(async (request) => {
  try {
    // Validate input
    const validation = availabilitySchema.safeParse(request.data);
    if (!validation.success) {
      throw new Error(validation.error.errors[0].message);
    }

    const { unitId, startDate, endDate }: AvailabilityInput = validation.data;

    // Get unit details
    const unitDoc = await db.collection('units').doc(unitId).get();
    if (!unitDoc.exists) {
      throw new Error('Unit not found');
    }

    const unit = unitDoc.data();
    const calendarId = unit?.googleCalendarId;

    // Fetch calendar events
    const calendarEvents = calendarId
      ? await calendarService.getEvents(calendarId, startDate, endDate)
      : [];

    // Fetch blocked dates from Firestore
    const blockedDatesSnapshot = await db.collection('blockedDates')
      .where('unitId', '==', unitId)
      .where('startDate', '>=', startDate)
      .where('endDate', '<=', endDate)
      .get();

    const blockedDates = blockedDatesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        start: data.startDate.toDate(),
        end: data.endDate.toDate(),
        reason: data.reason
      };
    });

    // Merge calendar and blocked dates
    const unavailableDates = [
      ...calendarEvents.map((event: any) => ({
        start: event.start.date || event.start.dateTime,
        end: event.end.date || event.end.dateTime,
        reason: 'Booked'
      })),
      ...blockedDates
    ];

    return {
      success: true,
      data: {
        unitId,
        unavailableDates
      }
    };
  } catch (error: any) {
    console.error('Error checking availability:', error);
    return {
      success: false,
      error: error.message || 'Failed to check availability'
    };
  }
});

/**
 * Create a new booking
 * POST /createBooking
 * Body: { unitId, unitName, guestName, guestEmail, guestPhone, checkIn, checkOut, notes }
 */
export const createBooking = onCall(async (request) => {
  try {
    // Validate input
    const validation = bookingSchema.safeParse(request.data);
    if (!validation.success) {
      throw new Error(validation.error.errors[0].message);
    }

    const bookingData: BookingInput = validation.data;

    // Calculate nights and total price
    const checkInDate = new Date(bookingData.checkIn);
    const checkOutDate = new Date(bookingData.checkOut);
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Get unit to fetch price
    const unitDoc = await db.collection('units').doc(bookingData.unitId).get();
    if (!unitDoc.exists) {
      throw new Error('Unit not found');
    }

    const unit = unitDoc.data();
    const totalPrice = (unit?.price || 0) * nights;

    // Check availability one more time
    const availabilityResult = await checkAvailability({
      data: {
        unitId: bookingData.unitId,
        startDate: bookingData.checkIn,
        endDate: bookingData.checkOut
      }
    } as any);

    if (!availabilityResult.success || availabilityResult.data.unavailableDates.length > 0) {
      throw new Error('Selected dates are not available');
    }

    // Create calendar event
    let calendarEventId = '';
    if (unit?.googleCalendarId) {
      try {
        const calendarEvent = await calendarService.createEvent(
          unit.googleCalendarId,
          {
            summary: `Reserva: ${bookingData.guestName}`,
            description: `Email: ${bookingData.guestEmail}\nTelefone: ${bookingData.guestPhone}\nNotas: ${bookingData.notes || 'N/A'}`,
            startDate: checkInDate,
            endDate: checkOutDate,
            guestEmail: bookingData.guestEmail
          }
        );
        calendarEventId = calendarEvent.id;
      } catch (error) {
        console.error('Calendar event creation failed:', error);
        // Continue anyway - booking is more important than calendar
      }
    }

    // Save booking to Firestore
    const bookingRef = await db.collection('bookings').add({
      ...bookingData,
      nights,
      totalPrice,
      googleCalendarEventId: calendarEventId,
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const confirmationCode = `RN${new Date().getFullYear()}${bookingRef.id.substring(0, 6).toUpperCase()}`;

    // Send emails (async, don't wait)
    const bookingForEmail = {
      ...bookingData,
      nights,
      totalPrice,
      checkIn: checkInDate,
      checkOut: checkOutDate
    };

    emailService.sendBookingConfirmation(bookingForEmail).catch(console.error);
    emailService.notifyOwner(bookingForEmail).catch(console.error);

    return {
      success: true,
      data: {
        bookingId: bookingRef.id,
        confirmationCode,
        calendarEventId: calendarEventId,
        totalPrice,
        nights
      }
    };
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return {
      success: false,
      error: error.message || 'Failed to create booking'
    };
  }
});

/**
 * Chat with AI (Gemini)
 * POST /chatWithAI
 * Body: { message, sessionId, context }
 */
export const chatWithAI = onCall(async (request) => {
  try {
    // Validate input
    const validation = chatMessageSchema.safeParse(request.data);
    if (!validation.success) {
      throw new Error(validation.error.errors[0].message);
    }

    const { message, sessionId, context }: ChatMessageInput = validation.data;

    // Fetch units for context
    const unitsSnapshot = await db.collection('units')
      .where('isActive', '==', true)
      .get();

    const units = unitsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Get AI response
    const aiResponse = await geminiService.chat(message, { units, ...context });

    // Save messages to Firestore
    const messagesRef = db.collection('chatSessions')
      .doc(sessionId)
      .collection('messages');

    await messagesRef.add({
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    await messagesRef.add({
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    });

    return {
      success: true,
      data: {
        message: aiResponse,
        sessionId
      }
    };
  } catch (error: any) {
    console.error('Error in chat:', error);
    return {
      success: false,
      error: error.message || 'Failed to process chat message'
    };
  }
});
