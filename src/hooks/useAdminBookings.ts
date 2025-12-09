import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  Timestamp,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Booking {
  id: string;
  confirmationCode: string;
  unitId: string;
  unitName: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  notes?: string;
  googleCalendarEventId?: string;
}

interface UseAdminBookingsReturn {
  bookings: Booking[];
  loading: boolean;
  error: Error | null;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => Promise<void>;
  refreshBookings: () => void;
}

/**
 * Hook para administração de reservas - busca e atualiza bookings em tempo real
 * @returns {UseAdminBookingsReturn} Estado com bookings, loading, error e funções de atualização
 */
export function useAdminBookings(): UseAdminBookingsReturn {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Função auxiliar para converter Timestamp do Firestore para string ISO
  const convertTimestampToString = (timestamp: any): string => {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate().toISOString();
    }
    if (timestamp && typeof timestamp.toDate === 'function') {
      return timestamp.toDate().toISOString();
    }
    if (typeof timestamp === 'string') {
      return timestamp;
    }
    return new Date().toISOString();
  };

  // Função para converter documento do Firestore para Booking
  const convertDocToBooking = (doc: DocumentData): Booking => {
    const data = doc.data();
    return {
      id: doc.id,
      confirmationCode: data.confirmationCode || `RN${Date.now()}`,
      unitId: data.unitId || '',
      unitName: data.unitName || '',
      guestName: data.guestName || '',
      guestEmail: data.guestEmail || '',
      guestPhone: data.guestPhone,
      checkIn: convertTimestampToString(data.checkIn),
      checkOut: convertTimestampToString(data.checkOut),
      nights: data.nights || 0,
      totalPrice: data.totalPrice || 0,
      status: data.status || 'pending',
      createdAt: convertTimestampToString(data.createdAt),
      notes: data.notes,
      googleCalendarEventId: data.googleCalendarEventId
    };
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Query com listener em tempo real - ordena por createdAt descrescente
    const q = query(
      collection(db, 'bookings'),
      orderBy('createdAt', 'desc')
    );

    // Listener em tempo real - atualiza automaticamente quando há mudanças
    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot) => {
        try {
          const bookingsData = snapshot.docs.map(convertDocToBooking);
          setBookings(bookingsData);
          setError(null);
        } catch (err) {
          console.error('Error processing bookings:', err);
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error('Error fetching bookings:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    // Cleanup: desinscrever do listener quando o componente desmontar
    return () => unsubscribe();
  }, []);

  /**
   * Atualiza o status de uma reserva
   * @param bookingId - ID da reserva
   * @param status - Novo status
   */
  const updateBookingStatus = async (
    bookingId: string,
    status: Booking['status']
  ): Promise<void> => {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingRef, {
        status,
        updatedAt: Timestamp.now()
      });

      // Nota: Não precisamos atualizar o estado local manualmente
      // O listener onSnapshot vai detectar a mudança e atualizar automaticamente
    } catch (err) {
      console.error('Error updating booking status:', err);
      throw err;
    }
  };

  /**
   * Força refresh manual dos bookings (opcional, já que temos real-time)
   */
  const refreshBookings = () => {
    // Com onSnapshot, o refresh é automático
    // Esta função existe apenas para compatibilidade com a interface antiga
    console.log('Bookings are automatically synced via real-time listener');
  };

  return {
    bookings,
    loading,
    error,
    updateBookingStatus,
    refreshBookings
  };
}
