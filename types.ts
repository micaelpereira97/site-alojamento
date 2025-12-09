export interface Unit {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  bedrooms: number; // Novo: Nº de quartos
  bathrooms: number; // Novo: Nº de casas de banho
  amenities: string[];
  imageUrl: string;
  images: string[]; // Novo: Galeria de imagens
  googleCalendarId?: string;
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
  unitId: string;
  startDate: Date;
  endDate: Date;
  guestName: string;
  email: string;
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