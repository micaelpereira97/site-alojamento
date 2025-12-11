export interface Unit {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  size: number; // Área em m²
  amenities: string[];
  imageUrl: string;
  images: string[];
  googleCalendarId: string;
  isActive: boolean;
  createdAt: Date | { seconds: number; nanoseconds: number }; // Firestore Timestamp
  updatedAt: Date | { seconds: number; nanoseconds: number }; // Firestore Timestamp
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  images?: string[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  distance: string;
}

export interface Booking {
  id: string;
  unitId: string;
  unitName: string; // Denormalized for easy display
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  startDate: Date | { seconds: number; nanoseconds: number }; // Firestore Timestamp
  endDate: Date | { seconds: number; nanoseconds: number }; // Firestore Timestamp
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date | { seconds: number; nanoseconds: number }; // Firestore Timestamp
  calendarEventId?: string; // Google Calendar event ID (optional)
  notes?: string; // Additional notes (optional)
}

export enum Tab {
  HOME = 'home',
  ACCOMMODATION = 'accommodation',
  ACTIVITIES = 'activities',
  SERVICES = 'services',
  LOCATION = 'location',
  TERMS = 'terms',
  PRIVACY = 'privacy',
}