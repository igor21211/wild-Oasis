import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { CabinType } from './types';
import FormRow from '../../ui/FromRow';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({
  cabin = {
    id: 0,
    createdAt: '',
    name: '',
    maxCapacity: 0,
    regularPrice: 0,
    discount: 0,
    image: '',
    description: '',
  },
  onCloseModal,
}: {
  cabin?: CabinType;
  onCloseModal?: () => void;
}) {
  const { id: editId, ...editValues } = cabin;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const { isPending, mutate } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isEditing || isPending;

  function onSubmit(data: CabinType) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession) {
      editCabin(
        { cabin: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      mutate(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(errors: FieldErrors) {
    console.log(errors);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow
        label="Cabin name"
        id="name"
        error={errors?.name?.message?.toString()}
      >
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        id="maxCapacity"
        error={errors?.maxCapacity?.message?.toString()}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: 1,
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        id="regularPrice"
        error={errors?.regularPrice?.message?.toString()}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: 1,
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        id="discount"
        error={errors?.discount?.message?.toString()}
      >
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value < getValues().regularPrice ||
              'Discount must be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        id="description"
        error={errors?.description?.message?.toString()}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow
        label="Cabin photo"
        id="image"
        error={errors?.image?.message?.toString()}
      >
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          disabled={isWorking}
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          size="small"
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          disabled={isWorking}
          type="submit"
          size="small"
          variation="primary"
        >
          {isEditSession ? 'Edit cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
