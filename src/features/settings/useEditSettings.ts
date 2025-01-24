import toast from 'react-hot-toast';
import { updateSetting } from '../../services/apiSettings';
import { useMutation } from '@tanstack/react-query';
import { NewSetting } from '../../services/apiSettings';

export function useEditSettings() {
  const { mutate: editSettings, isPending: isEditing } = useMutation({
    mutationKey: ['settingsUpdate'],
    mutationFn: (newSetting: NewSetting) => updateSetting(newSetting),
    onSuccess: () => {
      toast.success('Settings updated successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isEditing, editSettings };
}
