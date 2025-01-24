import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';
import { CabinProps } from './types';

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ['createCabin'],
    mutationFn: (cabin: CabinProps) => createEditCabin(cabin),
    onSuccess: () => {
      toast.success('Cabin created successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: () => {
      toast.error('Cabin not created');
    },
  });

  return { isPending, mutate };
}
