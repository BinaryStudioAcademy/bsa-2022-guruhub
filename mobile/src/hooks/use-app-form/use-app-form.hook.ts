import {
  DeepPartial,
  useForm,
  UseFormHandleSubmit,
  UseFormReset,
} from 'react-hook-form';

import {
  FormControl,
  FormControlErrors,
  FormControlValues,
  ValidationSchema,
} from '~/common/types/types';
import { getFormValidationResolver } from '~/helpers/helpers';

type UseAppFormParams<T extends FormControlValues = FormControlValues> = {
  defaultValues: DeepPartial<T>;
  validationSchema?: ValidationSchema;
};

type UseAppFormResult<T extends FormControlValues = FormControlValues> = {
  control: FormControl<T>;
  errors: FormControlErrors<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  reset: UseFormReset<T>;
};

const useAppForm = <T extends FormControlValues = FormControlValues>({
  validationSchema,
  defaultValues,
}: UseAppFormParams<T>): UseAppFormResult<T> => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<T>({
    defaultValues,
    resolver: validationSchema
      ? getFormValidationResolver(validationSchema)
      : undefined,
  });

  return {
    control,
    errors,
    handleSubmit,
    reset,
  };
};

export { useAppForm };
