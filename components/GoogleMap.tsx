import React from 'react';
import { MapPin } from 'lucide-react';

interface GoogleMapProps {
  address?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  className?: string;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({
  address = "Serra da Lousã, Portugal",
  lat,
  lng,
  zoom = 14,
  className = ""
}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // If no API key is configured, show placeholder
  if (!apiKey || apiKey === 'your_google_maps_api_key') {
    return (
      <div className={`relative bg-stone-200 flex items-center justify-center ${className}`}>
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
          alt="Mapa"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-10 bg-white p-6 rounded-xl shadow-lg text-center max-w-sm mx-4">
          <MapPin className="mx-auto mb-3 text-brand-600" size={32} />
          <p className="font-bold text-stone-800 mb-2">Google Maps não configurado</p>
          <p className="text-sm text-stone-600 mb-4">
            Configure VITE_GOOGLE_MAPS_API_KEY no ficheiro .env.local
          </p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium text-sm underline"
          >
            Abrir no Google Maps
          </a>
        </div>
      </div>
    );
  }

  // Build the embed URL
  let embedUrl = 'https://www.google.com/maps/embed/v1/';

  if (lat && lng) {
    // Use coordinates if provided
    embedUrl += `view?center=${lat},${lng}&zoom=${zoom}`;
  } else {
    // Use address/place search
    embedUrl += `place?q=${encodeURIComponent(address)}`;
  }

  embedUrl += `&key=${apiKey}`;

  return (
    <div className={`relative ${className}`}>
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={embedUrl}
        title="Google Maps"
        className="rounded-lg"
      />
    </div>
  );
};
