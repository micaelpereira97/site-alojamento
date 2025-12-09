/**
 * Booking utility functions
 * Handles cancellation policies, refunds, and booking validations
 */

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

export interface CancellationPolicy {
  daysBeforeCheckIn: number;
  refundPercentage: number;
  description: string;
}

export interface RefundCalculation {
  refundAmount: number;
  refundPercentage: number;
  policyApplied: CancellationPolicy;
  daysUntilCheckIn: number;
}

/**
 * Cancellation policies (from Terms & Conditions)
 */
export const CANCELLATION_POLICIES: CancellationPolicy[] = [
  {
    daysBeforeCheckIn: 30,
    refundPercentage: 100,
    description: 'Reembolso total'
  },
  {
    daysBeforeCheckIn: 15,
    refundPercentage: 50,
    description: 'Reembolso de 50%'
  },
  {
    daysBeforeCheckIn: 0,
    refundPercentage: 0,
    description: 'Sem reembolso'
  }
];

/**
 * Calculate days between two dates
 */
export function calculateDaysDifference(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  const diffTime = date2.getTime() - date1.getTime();
  return Math.ceil(diffTime / oneDay);
}

/**
 * Calculate number of nights between check-in and check-out
 */
export function calculateNights(checkIn: Date, checkOut: Date): number {
  return calculateDaysDifference(checkIn, checkOut);
}

/**
 * Get applicable cancellation policy based on days until check-in
 */
export function getApplicableCancellationPolicy(
  daysUntilCheckIn: number
): CancellationPolicy {
  // Policies are ordered from most generous to least generous
  for (const policy of CANCELLATION_POLICIES) {
    if (daysUntilCheckIn >= policy.daysBeforeCheckIn) {
      return policy;
    }
  }

  // Fallback to no refund if somehow we didn't match any policy
  return CANCELLATION_POLICIES[CANCELLATION_POLICIES.length - 1];
}

/**
 * Calculate refund amount for a cancellation
 */
export function calculateRefund(
  totalPrice: number,
  checkInDate: Date,
  cancellationDate: Date = new Date()
): RefundCalculation {
  const daysUntilCheckIn = calculateDaysDifference(cancellationDate, checkInDate);
  const policy = getApplicableCancellationPolicy(daysUntilCheckIn);

  const refundAmount = (totalPrice * policy.refundPercentage) / 100;

  return {
    refundAmount: Math.round(refundAmount * 100) / 100, // Round to 2 decimals
    refundPercentage: policy.refundPercentage,
    policyApplied: policy,
    daysUntilCheckIn
  };
}

/**
 * Validate if check-in date is in the future
 */
export function isCheckInValid(checkInDate: Date): boolean {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Start of today
  return checkInDate >= now;
}

/**
 * Validate if check-out is after check-in
 */
export function isCheckOutValid(checkInDate: Date, checkOutDate: Date): boolean {
  return checkOutDate > checkInDate;
}

/**
 * Validate minimum stay (usually 1 night)
 */
export function isMinimumStayValid(nights: number, minimumNights: number = 1): boolean {
  return nights >= minimumNights;
}

/**
 * Validate maximum stay (optional, e.g., 30 nights)
 */
export function isMaximumStayValid(nights: number, maximumNights: number = 30): boolean {
  return nights <= maximumNights;
}

/**
 * Check if a booking can be cancelled
 */
export function canCancelBooking(
  bookingStatus: BookingStatus,
  checkInDate: Date
): { canCancel: boolean; reason?: string } {
  // Cannot cancel if already cancelled
  if (bookingStatus === BookingStatus.CANCELLED) {
    return {
      canCancel: false,
      reason: 'A reserva já foi cancelada'
    };
  }

  // Cannot cancel if already completed
  if (bookingStatus === BookingStatus.COMPLETED) {
    return {
      canCancel: false,
      reason: 'A reserva já foi concluída'
    };
  }

  // Cannot cancel if check-in has already passed
  const now = new Date();
  if (checkInDate < now) {
    return {
      canCancel: false,
      reason: 'Não é possível cancelar após o check-in'
    };
  }

  return { canCancel: true };
}

/**
 * Generate a unique confirmation code
 */
export function generateConfirmationCode(bookingId: string): string {
  const year = new Date().getFullYear();
  const shortId = bookingId.substring(0, 6).toUpperCase();
  return `RN${year}${shortId}`;
}

/**
 * Calculate total price based on nights and nightly rate
 */
export function calculateTotalPrice(pricePerNight: number, nights: number): number {
  return Math.round(pricePerNight * nights * 100) / 100;
}

/**
 * Validate booking dates and capacity
 */
export interface BookingValidation {
  isValid: boolean;
  errors: string[];
}

export function validateBooking(data: {
  checkIn: Date;
  checkOut: Date;
  guests: number;
  unitCapacity: number;
}): BookingValidation {
  const errors: string[] = [];

  // Validate check-in is in the future
  if (!isCheckInValid(data.checkIn)) {
    errors.push('A data de check-in deve ser no futuro');
  }

  // Validate check-out is after check-in
  if (!isCheckOutValid(data.checkIn, data.checkOut)) {
    errors.push('A data de check-out deve ser após o check-in');
  }

  // Validate minimum stay
  const nights = calculateNights(data.checkIn, data.checkOut);
  if (!isMinimumStayValid(nights)) {
    errors.push('A estadia mínima é de 1 noite');
  }

  // Validate maximum stay
  if (!isMaximumStayValid(nights)) {
    errors.push('A estadia máxima é de 30 noites');
  }

  // Validate capacity
  if (data.guests > data.unitCapacity) {
    errors.push(`O número de hóspedes excede a capacidade da unidade (${data.unitCapacity})`);
  }

  if (data.guests < 1) {
    errors.push('Deve ter pelo menos 1 hóspede');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, currency: string = '€'): string {
  return `${amount.toFixed(2)}${currency}`;
}

/**
 * Check if dates overlap with existing booking
 */
export function doDatesOverlap(
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): boolean {
  return start1 < end2 && start2 < end1;
}
