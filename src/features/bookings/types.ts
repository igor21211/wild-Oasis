export interface BookingType {
  id: number;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuest: number;
  totalPrice: number;
  status: string;
  guests: { fullName: string; email: string };
  cabins: { name: string };
}
