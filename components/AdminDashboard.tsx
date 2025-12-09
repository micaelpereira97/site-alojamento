import React, { useState, useEffect } from 'react';
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Euro,
  Users,
  Home,
  Mail,
  Phone,
  Filter,
  RefreshCw,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { useAdminBookings } from '../src/hooks/useAdminBookings';
import type { Booking } from '../src/hooks/useAdminBookings';
import { ConsolidatedCalendar } from './ConsolidatedCalendar';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  // Use o hook do Firebase para bookings em tempo real
  const { bookings, loading, error: firebaseError, updateBookingStatus, refreshBookings } = useAdminBookings();

  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    filterBookings();
  }, [bookings, statusFilter]);

  const filterBookings = () => {
    if (statusFilter === 'all') {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter(b => b.status === statusFilter));
    }
  };

  const handleApprove = async (bookingId: string) => {
    setActionLoading(bookingId);
    try {
      await updateBookingStatus(bookingId, 'confirmed');
      alert('Reserva aprovada com sucesso! Email enviado ao hóspede.');
    } catch (err) {
      alert('Erro ao aprovar reserva: ' + (err as Error).message);
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (bookingId: string) => {
    const reason = prompt('Motivo da recusa (opcional):');

    setActionLoading(bookingId);
    try {
      await updateBookingStatus(bookingId, 'cancelled');
      alert('Reserva recusada. Email enviado ao hóspede.');
    } catch (err) {
      alert('Erro ao recusar reserva: ' + (err as Error).message);
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      confirmed: 'bg-green-100 text-green-800 border-green-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300',
      completed: 'bg-gray-100 text-gray-800 border-gray-300'
    };

    const labels = {
      pending: 'Pendente',
      confirmed: 'Confirmada',
      cancelled: 'Cancelada',
      completed: 'Concluída'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const stats = {
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    total: bookings.length,
    revenue: bookings
      .filter(b => b.status === 'confirmed' || b.status === 'completed')
      .reduce((sum, b) => sum + b.totalPrice, 0)
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl my-8">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard do Proprietário</h1>
              <p className="text-blue-100">Gestão de Reservas - Recanto da Natureza</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition"
            >
              <XCircle size={24} />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-gray-50">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="text-yellow-500" size={32} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Confirmadas</p>
                <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
              <CheckCircle className="text-green-500" size={32} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total</p>
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              </div>
              <Calendar className="text-blue-500" size={32} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Receita</p>
                <p className="text-2xl font-bold text-green-600">{stats.revenue}€</p>
              </div>
              <TrendingUp className="text-green-500" size={32} />
            </div>
          </div>
        </div>

        {/* Calendário Consolidado */}
        <div className="p-6 bg-gray-50">
          <ConsolidatedCalendar bookings={bookings} />
        </div>

        {/* Filters */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Filter size={20} className="text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todas as Reservas</option>
              <option value="pending">Pendentes</option>
              <option value="confirmed">Confirmadas</option>
              <option value="cancelled">Canceladas</option>
              <option value="completed">Concluídas</option>
            </select>
          </div>

          <button
            onClick={refreshBookings}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <RefreshCw size={18} />
            Atualizar
          </button>
        </div>

        {/* Bookings List */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="animate-spin mx-auto mb-4 text-blue-600" size={32} />
              <p className="text-gray-500">A carregar reservas...</p>
            </div>
          ) : firebaseError ? (
            <div className="text-center py-12">
              <AlertCircle className="mx-auto mb-4 text-red-500" size={32} />
              <p className="text-red-600">{firebaseError.message}</p>
              <button
                onClick={refreshBookings}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Tentar novamente
              </button>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-500">Nenhuma reserva encontrada</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map(booking => (
                <div
                  key={booking.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-4">

                    {/* Booking Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{booking.guestName}</h3>
                            {getStatusBadge(booking.status)}
                          </div>
                          <p className="text-sm text-gray-500">Código: <span className="font-mono font-semibold">{booking.confirmationCode}</span></p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Home size={16} />
                            <span className="font-semibold">{booking.unitName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail size={16} />
                            <a href={`mailto:${booking.guestEmail}`} className="hover:text-blue-600">{booking.guestEmail}</a>
                          </div>
                          {booking.guestPhone && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone size={16} />
                              <a href={`tel:${booking.guestPhone}`} className="hover:text-blue-600">{booking.guestPhone}</a>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar size={16} />
                            <span>{new Date(booking.checkIn).toLocaleDateString('pt-PT')} → {new Date(booking.checkOut).toLocaleDateString('pt-PT')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock size={16} />
                            <span>{booking.nights} noites</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Euro size={16} />
                            <span className="font-bold text-green-600">{booking.totalPrice}€</span>
                          </div>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                          <p className="text-sm text-gray-700"><strong>Notas:</strong> {booking.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    {booking.status === 'pending' && (
                      <div className="flex lg:flex-col gap-2 lg:w-48">
                        <button
                          onClick={() => handleApprove(booking.id)}
                          disabled={actionLoading === booking.id}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {actionLoading === booking.id ? (
                            <RefreshCw size={18} className="animate-spin" />
                          ) : (
                            <CheckCircle size={18} />
                          )}
                          Aprovar
                        </button>
                        <button
                          onClick={() => handleReject(booking.id)}
                          disabled={actionLoading === booking.id}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {actionLoading === booking.id ? (
                            <RefreshCw size={18} className="animate-spin" />
                          ) : (
                            <XCircle size={18} />
                          )}
                          Recusar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
