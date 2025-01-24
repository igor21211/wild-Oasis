import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue, method: 'eq' };
  const sortByValue = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortByValue.split('-');
  const sortBy = { field, direction };
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const {
    data: bookingsData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, currentPage],
    queryFn: () =>
      getBookings({ filter: filter!, sortBy: sortBy!, page: currentPage }),
  });

  const bookings = bookingsData?.data;
  const count = bookingsData?.count;
  // prefetch
  if (count) {
    const pageCount = Math.ceil(count / PAGE_SIZE);
    if (currentPage < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ['bookings', filter, sortBy, currentPage + 1],
        queryFn: () =>
          getBookings({
            filter: filter!,
            sortBy: sortBy!,
            page: currentPage + 1,
          }),
      });
    }
    if (currentPage > 1) {
      queryClient.prefetchQuery({
        queryKey: ['bookings', filter, sortBy, currentPage - 1],
        queryFn: () =>
          getBookings({
            filter: filter!,
            sortBy: sortBy!,
            page: currentPage - 1,
          }),
      });
    }
  }

  return { bookings, error, isLoading, count };
}
