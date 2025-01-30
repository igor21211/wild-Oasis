import { signup } from '../../services/apiAuth';
import { SignupProps } from './types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useSignUp() {
  const { mutate, isPending } = useMutation({
    mutationFn: (signupData: SignupProps) => signup(signupData),
    onSuccess: () => {
      toast.success('Account successfully created');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signup: mutate, isLoading: isPending };
}
