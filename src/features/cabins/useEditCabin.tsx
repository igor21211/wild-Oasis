import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { CabinType } from './types';
import { createEditCabin } from '../../services/apiCabins';

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationKey: ['editCabin'],
    mutationFn: ({ cabin, id }: { cabin: CabinType; id?: number }) =>
      createEditCabin(cabin, id),
    onSuccess: () => {
      toast.success('Cabin edited successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: () => {
      toast.error('Cabin not edited');
    },
  });

  return { isEditing, editCabin };
}
