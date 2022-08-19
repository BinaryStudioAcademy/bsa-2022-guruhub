import {
  FormControl,
  FormControlErrors,
  FormControlValues,
  FormGetValues,
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
  handleSubmit: UseFormHandleSubmit<T>;
  reset: UseFormReset<T>;
  getValues: FormGetValues;
};

const useAppForm = <T extends FormControlValues = FormControlValues>({
  validationSchema,
  defaultValues,
}: UseAppFormArgs): UseAppFormResult<T> => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<FormControlValues>({
    defaultValues,
    resolver: validationSchema
      ? getFormValidationResolver(validationSchema)
      : undefined,
  });

  return {
    handleSubmit: handleSubmit as UseFormHandleSubmit<T>,
    reset,
    control,
    errors,
    getValues,
  };
};

export { useAppForm };
