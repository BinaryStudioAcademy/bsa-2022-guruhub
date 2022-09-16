import {
  DeepPartial,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormReset,
  ValidationMode,
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
  mode?: keyof ValidationMode;
};

type UseAppFormResult<T extends FormControlValues = FormControlValues> = {
  control: FormControl<T>;
  errors: FormControlErrors<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  reset: UseFormReset<T>;
  watch: UseFormGetValues<T>;
};

const useAppForm = <T extends FormControlValues = FormControlValues>({
  validationSchema,
  defaultValues,
  mode,
}: UseAppFormParams<T>): UseAppFormResult<T> => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<T>({
    mode,
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
    watch,
  };
};

export { useAppForm };
