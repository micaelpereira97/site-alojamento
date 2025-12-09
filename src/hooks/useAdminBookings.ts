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

    // 🎭 MOCK DATA para desenvolvimento/teste (quando Firebase não está disponível)
    const useMockData = !import.meta.env.VITE_FIREBASE_PROJECT_ID ||
                        import.meta.env.VITE_USE_MOCK_DATA === 'true' ||
                        import.meta.env.VITE_USE_FIREBASE_EMULATORS !== 'true';

    if (useMockData) {
      console.log('🎭 Usando MOCK DATA para desenvolvimento');
      console.log('📋 Firebase emulators are not enabled, using mock bookings instead');

      // Simular delay de rede
      setTimeout(() => {
        const mockBookings: Booking[] = [
          {
            id: '1',
            confirmationCode: 'RN2025ABC123',
            unitId: 'casa-da-serra',
            unitName: 'Casa da Serra',
            guestName: 'João Silva',
            guestEmail: 'joao.silva@example.com',
            guestPhone: '+351 912 345 678',
            checkIn: '2025-12-20T00:00:00.000Z',
            checkOut: '2025-12-25T00:00:00.000Z',
            nights: 5,
            totalPrice: 600,
            status: 'pending',
            notes: 'Chegada prevista às 16h. Gostaria de informações sobre trilhos na região.',
            createdAt: '2025-12-09T10:30:00.000Z',
            googleCalendarEventId: 'mock-event-1'
          },
          {
            id: '2',
            confirmationCode: 'RN2025DEF456',
            unitId: 'loft-do-rio',
            unitName: 'Loft do Rio',
            guestName: 'Maria Santos',
            guestEmail: 'maria.santos@example.com',
            guestPhone: '+351 923 456 789',
            checkIn: '2025-12-15T00:00:00.000Z',
            checkOut: '2025-12-18T00:00:00.000Z',
            nights: 3,
            totalPrice: 285,
            status: 'confirmed',
            createdAt: '2025-12-08T14:20:00.000Z',
            googleCalendarEventId: 'mock-event-2'
          },
          {
            id: '3',
            confirmationCode: 'RN2025GHI789',
            unitId: 'cabana-da-floresta',
            unitName: 'Cabana da Floresta',
            guestName: 'Pedro Costa',
            guestEmail: 'pedro.costa@example.com',
            guestPhone: '+351 934 567 890',
            checkIn: '2025-12-30T00:00:00.000Z',
            checkOut: '2026-01-02T00:00:00.000Z',
            nights: 3,
            totalPrice: 240,
            status: 'pending',
            notes: 'Reserva para fim de ano. Interessado no serviço de pequeno-almoço.',
            createdAt: '2025-12-09T09:15:00.000Z',
            googleCalendarEventId: 'mock-event-3'
          },
          {
            id: '4',
            confirmationCode: 'RN2025JKL012',
            unitId: 'casa-da-serra',
            unitName: 'Casa da Serra',
            guestName: 'Ana Rodrigues',
            guestEmail: 'ana.rodrigues@example.com',
            guestPhone: '+351 915 678 901',
            checkIn: '2025-12-12T00:00:00.000Z',
            checkOut: '2025-12-14T00:00:00.000Z',
            nights: 2,
            totalPrice: 200,
            status: 'confirmed',
            notes: 'Fim de semana romântico. Interessada no serviço de massagens.',
            createdAt: '2025-12-07T16:45:00.000Z',
            googleCalendarEventId: 'mock-event-4'
          },
          {
            id: '5',
            confirmationCode: 'RN2025MNO345',
            unitId: 'loft-do-rio',
            unitName: 'Loft do Rio',
            guestName: 'Carlos Mendes',
            guestEmail: 'carlos.mendes@example.com',
            guestPhone: '+351 926 789 012',
            checkIn: '2026-01-05T00:00:00.000Z',
            checkOut: '2026-01-08T00:00:00.000Z',
            nights: 3,
            totalPrice: 285,
            status: 'pending',
            createdAt: '2025-12-09T11:20:00.000Z',
            googleCalendarEventId: 'mock-event-5'
          },
          {
            id: '6',
            confirmationCode: 'RN2025PQR678',
            unitId: 'cabana-da-floresta',
            unitName: 'Cabana da Floresta',
            guestName: 'Sofia Almeida',
            guestEmail: 'sofia.almeida@example.com',
            guestPhone: '+351 937 890 123',
            checkIn: '2025-11-20T00:00:00.000Z',
            checkOut: '2025-11-23T00:00:00.000Z',
            nights: 3,
            totalPrice: 240,
            status: 'completed',
            notes: 'Estadia concluída. Excelente experiência!',
            createdAt: '2025-11-10T09:30:00.000Z',
            googleCalendarEventId: 'mock-event-6'
          },
          {
            id: '7',
            confirmationCode: 'RN2025STU901',
            unitId: 'casa-da-serra',
            unitName: 'Casa da Serra',
            guestName: 'Miguel Ferreira',
            guestEmail: 'miguel.ferreira@example.com',
            guestPhone: '+351 918 901 234',
            checkIn: '2025-12-05T00:00:00.000Z',
            checkOut: '2025-12-07T00:00:00.000Z',
            nights: 2,
            totalPrice: 200,
            status: 'cancelled',
            notes: 'Cancelado pelo hóspede - mudança de planos.',
            createdAt: '2025-12-01T14:15:00.000Z',
            googleCalendarEventId: 'mock-event-7'
          }
        ];

        setBookings(mockBookings);
        setLoading(false);
        console.log(`✅ ${mockBookings.length} reservas mock carregadas`);
      }, 500);

      // Cleanup (nada a fazer com mock data)
      return () => {};
    }

    // 🔥 FIREBASE REAL - conectar ao Firestore
    try {
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
            console.log(`✅ ${bookingsData.length} reservas carregadas do Firebase`);
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
    } catch (err) {
      console.error('Error setting up Firebase listener:', err);
      setError(err as Error);
      setLoading(false);
      return () => {};
    }
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
    const useMockData = !import.meta.env.VITE_FIREBASE_PROJECT_ID ||
                        import.meta.env.VITE_USE_MOCK_DATA === 'true' ||
                        import.meta.env.VITE_USE_FIREBASE_EMULATORS !== 'true';

    if (useMockData) {
      // 🎭 MOCK: Simular atualização de status
      console.log(`🎭 MOCK: Atualizando booking ${bookingId} para status ${status}`);

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 800));

      // Atualizar estado local
      setBookings(prev =>
        prev.map(b => b.id === bookingId ? { ...b, status } : b)
      );

      console.log(`✅ MOCK: Status atualizado com sucesso`);
      return;
    }

    // 🔥 FIREBASE REAL: atualizar no Firestore
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingRef, {
        status,
        updatedAt: Timestamp.now()
      });

      // Nota: Não precisamos atualizar o estado local manualmente
      // O listener onSnapshot vai detectar a mudança e atualizar automaticamente
      console.log(`✅ Firebase: Status atualizado com sucesso`);
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
