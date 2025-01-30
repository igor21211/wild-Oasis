import { getStaysTodayActivity } from '../../services/apiBookings';
import { useQuery } from '@tanstack/react-query';

export const useTodayActivity = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['today-activity'],
    queryFn: getStaysTodayActivity,
  });

  return { isLoading, data };
};
