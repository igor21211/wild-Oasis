import { getBooking } from '../../services/apiBookings';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function useBooking() {
  const { bookingId } = useParams();
  const { data: booking, isLoading } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(Number(bookingId)),
  });

  return { booking, isLoading };
}
