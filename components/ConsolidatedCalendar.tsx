import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameMonth, isToday, parseISO, isWithinInterval } from 'date-fns';
import { pt } from 'date-fns/locale';
import type { Booking } from '../src/hooks/useAdminBookings';

interface ConsolidatedCalendarProps {
  bookings: Booking[];
}

interface DayBooking {
  unitName: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  guestName: string;
  confirmationCode: string;
}

export const ConsolidatedCalendar: React.FC<ConsolidatedCalendarProps> = ({ bookings }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Calcular dias do mês
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Mapear reservas por dia
  const bookingsByDay = useMemo(() => {
    const map = new Map<string, DayBooking[]>();

    // Filtrar apenas reservas confirmadas ou pendentes
    const activeBookings = bookings.filter(
      b => b.status === 'confirmed' || b.status === 'pending'
    );

    activeBookings.forEach(booking => {
      try {
        const checkIn = parseISO(booking.checkIn);
        const checkOut = parseISO(booking.checkOut);

        // Para cada dia da reserva
        const bookingDays = eachDayOfInterval({ start: checkIn, end: checkOut });

        bookingDays.forEach(day => {
          const dayKey = format(day, 'yyyy-MM-dd');

          if (!map.has(dayKey)) {
            map.set(dayKey, []);
          }

          map.get(dayKey)!.push({
            unitName: booking.unitName,
            status: booking.status,
            guestName: booking.guestName,
            confirmationCode: booking.confirmationCode
          });
        });
      } catch (error) {
        console.error('Error parsing booking dates:', error);
      }
    });

    return map;
  }, [bookings]);

  // Obter unidades únicas
  const units = useMemo(() => {
    const uniqueUnits = new Set(bookings.map(b => b.unitName));
    return Array.from(uniqueUnits);
  }, [bookings]);

  // Navegar meses
  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const goToToday = () => setCurrentMonth(new Date());

  // Renderizar um dia
  const renderDay = (day: Date) => {
    const dayKey = format(day, 'yyyy-MM-dd');
    const dayBookings = bookingsByDay.get(dayKey) || [];
    const isCurrentMonth = isSameMonth(day, currentMonth);
    const isCurrentDay = isToday(day);

    return (
      <div
        key={dayKey}
        className={`min-h-[120px] border border-stone-200 p-2 ${
          !isCurrentMonth ? 'bg-stone-50 text-stone-400' : 'bg-white'
        } ${isCurrentDay ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
      >
        <div className="flex justify-between items-start mb-1">
          <span className={`text-xs font-medium ${isCurrentDay ? 'text-blue-600 font-bold' : ''}`}>
            {format(day, 'd')}
          </span>
          {isCurrentDay && (
            <span className="text-[10px] bg-blue-100 text-blue-700 px-1 rounded">Hoje</span>
          )}
        </div>

        <div className="space-y-1">
          {dayBookings.map((booking, idx) => (
            <div
              key={`${booking.confirmationCode}-${idx}`}
              className={`text-[10px] px-1.5 py-0.5 rounded truncate ${
                booking.status === 'confirmed'
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-orange-100 text-orange-800 border border-orange-200'
              }`}
              title={`${booking.unitName} - ${booking.guestName} (${booking.confirmationCode})`}
            >
              <div className="font-semibold truncate">{booking.unitName}</div>
              <div className="truncate opacity-75">{booking.guestName}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Obter primeiro dia da semana do mês
  const startDayOfWeek = monthStart.getDay();

  // Criar array de dias incluindo padding
  const calendarDays = [];

  // Adicionar dias do mês anterior para preencher a primeira semana
  const prevMonthEnd = endOfMonth(subMonths(currentMonth, 1));
  const prevMonthDays = eachDayOfInterval({
    start: subMonths(prevMonthEnd, startDayOfWeek - 1),
    end: prevMonthEnd
  }).slice(-startDayOfWeek);

  calendarDays.push(...prevMonthDays);

  // Adicionar dias do mês atual
  calendarDays.push(...daysInMonth);

  // Adicionar dias do próximo mês para completar a última semana
  const remainingDays = 7 - (calendarDays.length % 7);
  if (remainingDays < 7) {
    const nextMonthStart = addMonths(monthStart, 1);
    const nextMonthDays = eachDayOfInterval({
      start: nextMonthStart,
      end: addMonths(nextMonthStart, 0)
    }).slice(0, remainingDays);
    calendarDays.push(...nextMonthDays);
  }

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-stone-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <CalendarIcon size={24} className="text-blue-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-800">
                Calendário Consolidado
              </h3>
              <p className="text-sm text-stone-500">
                Visualização de ocupação de todas as unidades
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-stone-100 rounded-lg transition"
              title="Mês anterior"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={goToToday}
              className="px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-lg transition"
            >
              Hoje
            </button>

            <button
              onClick={nextMonth}
              className="p-2 hover:bg-stone-100 rounded-lg transition"
              title="Próximo mês"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Mês/Ano */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-stone-800">
            {format(currentMonth, 'MMMM yyyy', { locale: pt })}
          </h2>
        </div>
      </div>

      {/* Legenda */}
      <div className="px-4 py-3 bg-stone-50 border-b border-stone-200 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
          <span className="text-stone-600">Confirmada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-100 border border-orange-200 rounded"></div>
          <span className="text-stone-600">Pendente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 ring-2 ring-blue-500 rounded"></div>
          <span className="text-stone-600">Dia Atual</span>
        </div>
      </div>

      {/* Cabeçalho dias da semana */}
      <div className="grid grid-cols-7 border-b border-stone-200 bg-stone-50">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
          <div
            key={day}
            className="p-2 text-center text-xs font-bold text-stone-600 uppercase tracking-wider"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grid do calendário */}
      <div className="grid grid-cols-7">
        {calendarDays.map(day => renderDay(day))}
      </div>

      {/* Footer com estatísticas */}
      <div className="p-4 border-t border-stone-200 bg-stone-50">
        <div className="flex flex-wrap gap-4 text-sm">
          <div>
            <span className="text-stone-500">Total de Unidades:</span>{' '}
            <span className="font-bold text-stone-800">{units.length}</span>
          </div>
          <div>
            <span className="text-stone-500">Reservas Ativas:</span>{' '}
            <span className="font-bold text-stone-800">
              {bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length}
            </span>
          </div>
          <div>
            <span className="text-stone-500">Dias com Reservas:</span>{' '}
            <span className="font-bold text-stone-800">{bookingsByDay.size}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
