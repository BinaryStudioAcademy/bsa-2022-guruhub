import {
  FormControl,
  FormControlErrors,
  FormControlGetValues,
  FormControlSetValues,
  FormControlValues,
  ValidationSchema,
} from 'common/types/types';
import { getFormValidationResolver } from 'helpers/helpers';
import { useForm, UseFormHandleSubmit, UseFormReset } from 'react-hook-form';

type UseAppFormArgs = {
  defaultValues: Record<string, unknown>;
  validationSchema?: ValidationSchema;
};

type UseAppFormResult<T extends FormControlValues = FormControlValues> = {
  control: FormControl;
  errors: FormControlErrors;
  setValue: FormControlSetValues;
  getValues: FormControlGetValues;
  handleSubmit: UseFormHandleSubmit<T>;
  reset: UseFormReset<T>;
};

const useAppForm = <T extends FormControlValues = FormControlValues>({
  validationSchema,
  defaultValues,
}: UseAppFormArgs): UseAppFormResult<T> => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormControlValues>({
    defaultValues,
    resolver: validationSchema
      ? getFormValidationResolver(validationSchema)
      : undefined,
  });

  return {
    handleSubmit: handleSubmit as UseFormHandleSubmit<T>,
    setValue,
    getValues,
    reset,
    control,
    errors,
  };
};

export { useAppForm };
