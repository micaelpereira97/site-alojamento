import { Timestamp } from 'firebase-admin/firestore';

export interface Unit {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: UnitImage[];
  googleCalendarId: string;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface UnitImage {
  url: string;
  alt: string;
  isCover: boolean;
  order: number;
}

export interface Booking {
  id: string;
  unitId: string;
  unitName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: Timestamp;
  checkOut: Timestamp;
  nights: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  googleCalendarEventId: string;
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface BlockedDate {
  id: string;
  unitId: string;
  startDate: Timestamp;
  endDate: Timestamp;
  reason: string;
  createdAt: Timestamp;
}

export interface ChatMessage {
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Timestamp;
  metadata?: Record<string, any>;
}
