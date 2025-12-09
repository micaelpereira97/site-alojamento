import { useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../lib/firebase';

interface BookingData {
  unitId: string;
  unitName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  notes?: string;
}

interface BookingResult {
  bookingId: string;
  calendarEventId: string;
  confirmationCode: string;
}

interface UseBookingReturn {
  createBooking: (data: BookingData) => Promise<BookingResult>;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook para criar reservas via Firebase Functions
 * @returns {UseBookingReturn} Função createBooking, loading e error states
 */
export function useBooking(): UseBookingReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createBooking = async (bookingData: BookingData): Promise<BookingResult> => {
    setLoading(true);
    setError(null);

    try {
      // Call Firebase Function
      const createBookingFn = httpsCallable<BookingData, { success: boolean; data: BookingResult }>(
        functions,
        'createBooking'
      );

      const result = await createBookingFn(bookingData);

      if (!result.data.success) {
        throw new Error('Booking creation failed');
      }

      return result.data.data;
    } catch (err) {
      console.error('Error creating booking:', err);
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, loading, error };
}
