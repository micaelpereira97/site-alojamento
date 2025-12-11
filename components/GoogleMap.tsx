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

  // Build embed URL - works without API key using basic Google Maps embed
  let embedUrl: string;

  if (!apiKey || apiKey === 'your_google_maps_api_key') {
    // Use free Google Maps embed (no API key required)
    if (lat && lng) {
      embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=pt&z=${zoom}&output=embed`;
    } else {
      embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&hl=pt&z=${zoom}&output=embed`;
    }
  } else {
    // Use Google Maps Embed API with key (more features)
    embedUrl = 'https://www.google.com/maps/embed/v1/';

    if (lat && lng) {
      embedUrl += `view?center=${lat},${lng}&zoom=${zoom}`;
    } else {
      embedUrl += `place?q=${encodeURIComponent(address)}`;
    }

    embedUrl += `&key=${apiKey}`;
  }

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
