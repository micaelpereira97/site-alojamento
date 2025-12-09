import { onCall } from 'firebase-functions/v2/https';
import { db } from '../config/firebase';
import { emailService } from '../services/email.service';
import { calculateRefund, BookingStatus } from '../utils/booking-utils';

/**
 * Update booking status (for admin/owner use)
 * POST /updateBookingStatus
 * Body: { bookingId, newStatus, reason }
 */
export const updateBookingStatus = onCall(async (request) => {
  try {
    const { bookingId, newStatus, reason } = request.data;

    if (!bookingId || !newStatus) {
      throw new Error('bookingId and newStatus are required');
    }

    // Validate status
    const validStatuses = Object.values(BookingStatus);
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    // Get booking
    const bookingDoc = await db.collection('bookings').doc(bookingId).get();

    if (!bookingDoc.exists) {
      throw new Error('Booking not found');
    }

    const booking = bookingDoc.data();
    const oldStatus = booking?.status;

    // Update booking status
    await db.collection('bookings').doc(bookingId).update({
      status: newStatus,
      statusUpdatedAt: new Date(),
      statusUpdatedBy: request.auth?.uid || 'system',
      statusUpdateReason: reason || null,
      updatedAt: new Date()
    });

    // Send email if status changed to confirmed
    if (newStatus === BookingStatus.CONFIRMED && oldStatus !== BookingStatus.CONFIRMED) {
      const emailData = {
        ...booking,
        status: 'confirmed' as const,
        checkIn: booking.checkIn.toDate ? booking.checkIn.toDate() : new Date(booking.checkIn),
        checkOut: booking.checkOut.toDate ? booking.checkOut.toDate() : new Date(booking.checkOut),
      };

      await emailService.sendBookingStatusUpdate(emailData, 'confirmed')
        .catch(err => console.error('Failed to send status update email:', err));
    }

    console.log(`✅ Booking ${bookingId} status updated: ${oldStatus} → ${newStatus}`);

    return {
      success: true,
      data: {
        bookingId,
        oldStatus,
        newStatus,
        updatedAt: new Date()
      }
    };
  } catch (error: any) {
    console.error('Error updating booking status:', error);
    return {
      success: false,
      error: error.message || 'Failed to update booking status'
    };
  }
});

/**
 * Cancel a booking with refund calculation
 * POST /cancelBooking
 * Body: { bookingId, reason }
 */
export const cancelBooking = onCall(async (request) => {
  try {
    const { bookingId, reason } = request.data;

    if (!bookingId) {
      throw new Error('bookingId is required');
    }

    // Get booking
    const bookingDoc = await db.collection('bookings').doc(bookingId).get();

    if (!bookingDoc.exists) {
      throw new Error('Booking not found');
    }

    const booking = bookingDoc.data();

    // Check if booking can be cancelled
    if (booking?.status === BookingStatus.CANCELLED) {
      throw new Error('Booking is already cancelled');
    }

    if (booking?.status === BookingStatus.COMPLETED) {
      throw new Error('Cannot cancel a completed booking');
    }

    // Calculate refund
    const checkInDate = booking.checkIn.toDate ? booking.checkIn.toDate() : new Date(booking.checkIn);
    const refundInfo = calculateRefund(booking.totalPrice, checkInDate);

    // Update booking
    await db.collection('bookings').doc(bookingId).update({
      status: BookingStatus.CANCELLED,
      cancelledAt: new Date(),
      cancelledBy: request.auth?.uid || 'guest',
      cancellationReason: reason || null,
      refundAmount: refundInfo.refundAmount,
      refundPercentage: refundInfo.refundPercentage,
      refundPolicy: refundInfo.policyApplied.description,
      updatedAt: new Date()
    });

    // Send cancellation email
    const emailData = {
      ...booking,
      status: 'cancelled' as const,
      checkIn: checkInDate,
      checkOut: booking.checkOut.toDate ? booking.checkOut.toDate() : new Date(booking.checkOut),
    };

    await emailService.sendBookingStatusUpdate(emailData, 'cancelled')
      .catch(err => console.error('Failed to send cancellation email:', err));

    console.log(`✅ Booking ${bookingId} cancelled. Refund: ${refundInfo.refundAmount}€ (${refundInfo.refundPercentage}%)`);

    return {
      success: true,
      data: {
        bookingId,
        status: BookingStatus.CANCELLED,
        refund: {
          amount: refundInfo.refundAmount,
          percentage: refundInfo.refundPercentage,
          policy: refundInfo.policyApplied.description,
          daysUntilCheckIn: refundInfo.daysUntilCheckIn
        },
        cancelledAt: new Date()
      }
    };
  } catch (error: any) {
    console.error('Error cancelling booking:', error);
    return {
      success: false,
      error: error.message || 'Failed to cancel booking'
    };
  }
});

/**
 * Get booking details by ID or confirmation code
 * POST /getBooking
 * Body: { bookingId } OR { confirmationCode }
 */
export const getBooking = onCall(async (request) => {
  try {
    const { bookingId, confirmationCode } = request.data;

    if (!bookingId && !confirmationCode) {
      throw new Error('Either bookingId or confirmationCode is required');
    }

    let bookingDoc;

    if (bookingId) {
      bookingDoc = await db.collection('bookings').doc(bookingId).get();
    } else {
      // Search by confirmation code
      const snapshot = await db.collection('bookings')
        .where('confirmationCode', '==', confirmationCode)
        .limit(1)
        .get();

      if (snapshot.empty) {
        throw new Error('Booking not found');
      }

      bookingDoc = snapshot.docs[0];
    }

    if (!bookingDoc.exists) {
      throw new Error('Booking not found');
    }

    const booking = bookingDoc.data();

    // Calculate refund if checking cancellation eligibility
    const checkInDate = booking.checkIn.toDate ? booking.checkIn.toDate() : new Date(booking.checkIn);
    const refundInfo = calculateRefund(booking.totalPrice, checkInDate);

    return {
      success: true,
      data: {
        id: bookingDoc.id,
        ...booking,
        refundEligibility: {
          canCancel: booking.status !== BookingStatus.CANCELLED && booking.status !== BookingStatus.COMPLETED,
          refundAmount: refundInfo.refundAmount,
          refundPercentage: refundInfo.refundPercentage,
          policy: refundInfo.policyApplied.description,
          daysUntilCheckIn: refundInfo.daysUntilCheckIn
        }
      }
    };
  } catch (error: any) {
    console.error('Error fetching booking:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch booking'
    };
  }
});
