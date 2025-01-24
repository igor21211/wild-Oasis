import { useSearchParams } from 'react-router-dom';
import { getCabins } from '../../services/apiCabins';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PAGE_SIZE } from '../../utils/constants';

export default function useCabins() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const filterValue = searchParams.get('discount');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : {
          field: 'discount',
          value: String(filterValue === '>0' ? 0 : filterValue),
          method: filterValue === '>0' ? 'gt' : 'eq',
        };
  const sortByValue = searchParams.get('sortBy') || 'created_at-desc';
  const [field, direction] = sortByValue.split('-');
  const sortBy = { field, direction };
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const { data: cabinsData, isLoading } = useQuery({
    queryKey: ['cabins', filter, sortBy, currentPage],
    queryFn: () =>
      getCabins({ filter: filter!, sortBy: sortBy!, page: currentPage }),
  });

  const cabins = cabinsData?.data;
  const count = cabinsData?.count;

  // prefetch
  if (count) {
    const pageCount = Math.ceil(count / PAGE_SIZE);
    if (currentPage < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ['cabins', filter, sortBy, currentPage + 1],
        queryFn: () =>
          getCabins({
            filter: filter!,
            sortBy: sortBy!,
            page: currentPage + 1,
          }),
      });
    }
    if (currentPage > 1) {
      queryClient.prefetchQuery({
        queryKey: ['cabins', filter, sortBy, currentPage - 1],
        queryFn: () =>
          getCabins({
            filter: filter!,
            sortBy: sortBy!,
            page: currentPage - 1,
          }),
      });
    }
  }

  return { cabins, isLoading, count };
}
