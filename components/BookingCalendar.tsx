import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday, 
  isBefore,
  addDays
} from 'date-fns';
import { pt } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface BookingCalendarProps {
  onDateSelect: (start: Date | null, end: Date | null) => void;
  bookedDates?: Date[];
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ onDateSelect, bookedDates = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleDayClick = (day: Date) => {
    // Impedir seleção de datas passadas
    if (isBefore(day, new Date()) && !isToday(day)) return;

    let newStart = startDate;
    let newEnd = endDate;

    if (!startDate || (startDate && endDate)) {
      // Começar nova seleção
      newStart = day;
      newEnd = null;
    } else if (startDate && !endDate) {
      // Completar seleção
      if (isBefore(day, startDate)) {
        newStart = day;
        newEnd = null; // Reinicia se clicar antes do inicio
      } else {
        newEnd = day;
      }
    }

    setStartDate(newStart);
    setEndDate(newEnd);
    onDateSelect(newStart, newEnd);
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={prevMonth} 
          disabled={isBefore(endOfMonth(subMonths(currentMonth, 1)), new Date())}
          className="p-2 hover:bg-stone-100 rounded-full text-stone-600 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="text-center">
          <span className="block text-lg font-bold text-stone-800 capitalize font-serif">
            {format(currentMonth, 'MMMM yyyy', { locale: pt })}
          </span>
        </div>
        <button onClick={nextMonth} className="p-2 hover:bg-stone-100 rounded-full text-stone-600 transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  const renderDaysHeader = () => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map(day => (
          <div key={day} className="text-center text-[10px] font-bold text-stone-400 uppercase tracking-widest py-2">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDateGrid = startOfWeek(monthStart);
    const endDateGrid = endOfWeek(monthEnd);

    // Gera todos os dias que devem aparecer na grelha
    const daysInGrid = eachDayOfInterval({
      start: startDateGrid,
      end: endDateGrid
    });

    return (
      <div className="grid grid-cols-7 gap-y-1">
        {daysInGrid.map((day) => {
          const formattedDate = format(day, 'd');
          
          const isSelectedStart = startDate ? isSameDay(day, startDate) : false;
          const isSelectedEnd = endDate ? isSameDay(day, endDate) : false;
          const isInRange = startDate && endDate && isBefore(startDate, day) && isBefore(day, endDate);
          const isPast = isBefore(day, new Date()) && !isToday(day);
          const isCurrentMonth = isSameMonth(day, monthStart);

          // Base Styles
          let wrapperClass = "relative h-10 w-full flex items-center justify-center cursor-pointer select-none ";
          let textClass = "w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all relative z-10 ";

          // Logic for Styles
          if (!isCurrentMonth) {
            textClass += "text-stone-300 ";
          } else if (isPast) {
            textClass += "text-stone-300 line-through decoration-stone-300 cursor-not-allowed ";
            wrapperClass = wrapperClass.replace("cursor-pointer", "cursor-not-allowed");
          } else if (isSelectedStart || isSelectedEnd) {
            textClass += "bg-brand-600 text-white shadow-md scale-105 ";
          } else if (isInRange) {
            textClass += "text-brand-800 bg-brand-100 ";
          } else {
            textClass += "text-stone-700 hover:bg-stone-100 hover:text-stone-900 ";
          }

          // Connecting lines for range
          const showLeftConnect = (isInRange || isSelectedEnd) && startDate;
          const showRightConnect = (isInRange || isSelectedStart) && endDate;

          return (
            <div 
              key={day.toString()} 
              className={wrapperClass}
              onClick={() => !isPast && handleDayClick(day)}
            >
              {/* Range Background Visuals */}
              {showLeftConnect && isCurrentMonth && (
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1/2 h-8 bg-brand-50 -z-0"></div>
              )}
              {showRightConnect && isCurrentMonth && (
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1/2 h-8 bg-brand-50 -z-0"></div>
              )}
              
              <div className={textClass}>
                {formattedDate}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl p-4 w-full max-w-sm mx-auto select-none">
      {renderHeader()}
      {renderDaysHeader()}
      {renderCells()}
      
      {/* Legenda */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500 font-medium">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-brand-600"></div>
          <span>Selecionado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-stone-300 bg-white"></div>
          <span>Disponível</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-stone-100 text-stone-300 flex items-center justify-center text-[8px]">×</div>
          <span>Indisponível</span>
        </div>
      </div>
    </div>
  );
};