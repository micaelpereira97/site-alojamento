import React from 'react';
import { Unit } from '../types';
import { Users, Wifi, Check, ArrowRight, BedDouble, Bath } from 'lucide-react';

interface UnitCardProps {
  unit: Unit;
  onBook: (unit: Unit) => void;
}

export const UnitCard: React.FC<UnitCardProps> = ({ unit, onBook }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl duration-300 flex flex-col h-full border border-stone-100 group/card">
      <div className="relative h-80 overflow-hidden">
        <img 
          src={unit.imageUrl} 
          alt={unit.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-brand-700 font-bold shadow-sm font-serif">
          {unit.pricePerNight}€ <span className="text-xs font-sans font-normal text-stone-500">/ noite</span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold font-serif text-stone-800">{unit.name}</h3>
        </div>
        
        <p className="text-stone-600 mb-6 text-sm leading-relaxed line-clamp-2">
          {unit.description}
        </p>
        
        {/* Especificações Rápidas */}
        <div className="flex items-center gap-4 mb-6 text-xs font-medium text-stone-500 border-y border-stone-100 py-3">
          <div className="flex items-center gap-1.5" title="Capacidade">
            <Users size={16} className="text-brand-600" />
            <span>{unit.capacity} Pax</span>
          </div>
          <div className="w-px h-4 bg-stone-200"></div>
          <div className="flex items-center gap-1.5" title="Quartos">
            <BedDouble size={16} className="text-brand-600" />
            <span>{unit.bedrooms} Quarto{unit.bedrooms > 1 ? 's' : ''}</span>
          </div>
          <div className="w-px h-4 bg-stone-200"></div>
          <div className="flex items-center gap-1.5" title="Casas de Banho">
            <Bath size={16} className="text-brand-600" />
            <span>{unit.bathrooms} WC</span>
          </div>
        </div>

        <div className="mb-6 flex-grow">
          <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Comodidades</h4>
          <div className="flex flex-wrap gap-2">
            {unit.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="bg-stone-50 text-stone-600 text-xs px-2 py-1 rounded-md flex items-center gap-1 border border-stone-100">
                <Check size={10} className="text-brand-500" /> {amenity}
              </span>
            ))}
            {unit.amenities.length > 3 && (
              <span className="text-xs text-stone-400 py-1">+ {unit.amenities.length - 3}</span>
            )}
          </div>
        </div>

        <button 
          onClick={() => onBook(unit)}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group tracking-wide text-sm uppercase"
        >
          Ver Disponibilidade
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};