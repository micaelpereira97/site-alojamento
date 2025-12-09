import { z } from 'zod';

export const bookingSchema = z.object({
  unitId: z.string().min(1, 'Unit ID is required'),
  unitName: z.string().min(1, 'Unit name is required'),
  guestName: z.string().min(2, 'Guest name must be at least 2 characters'),
  guestEmail: z.string().email('Invalid email address'),
  guestPhone: z.string().min(9, 'Phone number must be at least 9 digits'),
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
  notes: z.string().optional(),
}).refine(
  (data) => data.checkOut > data.checkIn,
  {
    message: 'Check-out date must be after check-in date',
    path: ['checkOut'],
  }
);

export const chatMessageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(1000, 'Message too long'),
  sessionId: z.string().uuid('Invalid session ID'),
  context: z.object({
    currentPage: z.string().optional(),
    userAgent: z.string().optional(),
  }).optional(),
});

export const availabilitySchema = z.object({
  unitId: z.string().min(1, 'Unit ID is required'),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
}).refine(
  (data) => data.endDate >= data.startDate,
  {
    message: 'End date must be after or equal to start date',
    path: ['endDate'],
  }
);

export type BookingInput = z.infer<typeof bookingSchema>;
export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
export type AvailabilityInput = z.infer<typeof availabilitySchema>;
