import { useNavigate } from 'react-router-dom';
import { logout as logoutApi } from '../../services/apiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'] });
      navigate('/login', { replace: true });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { logout, isPending };
}
