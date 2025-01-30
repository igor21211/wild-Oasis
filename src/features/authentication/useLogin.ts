import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginProps } from './types';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/apiAuth';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signIn, isPending } = useMutation({
    mutationFn: ({ email, password }: LoginProps) => login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      toast.success('Login successful');
      navigate('/dashboard', { replace: true });
    },
    onError: () => {
      toast.error('Invalid credentials');
    },
  });

  return { signIn, isPending };
}
