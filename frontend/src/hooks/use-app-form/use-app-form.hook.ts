import {
  FormControl,
  FormControlErrors,
  FormControlRegister,
  FormControlValues,
  ValidationSchema,
} from 'common/types/types';
import { getFormValidationResolver } from 'helpers/helpers';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';

type UseAppFormArgs = {
  defaultValues: Record<string, unknown>;
  validationSchema?: ValidationSchema;
};

type UseAppFormResult<T extends FormControlValues = FormControlValues> = {
  control: FormControl;
  register: FormControlRegister;
  errors: FormControlErrors;
  handleSubmit: UseFormHandleSubmit<T>;
};

const useAppForm = <T extends FormControlValues = FormControlValues>({
  validationSchema,
  defaultValues,
}: UseAppFormArgs): UseAppFormResult<T> => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormControlValues>({
    defaultValues,
    resolver: validationSchema
      ? getFormValidationResolver(validationSchema)
      : undefined,
  });

  return {
    register,
    handleSubmit: handleSubmit as UseFormHandleSubmit<T>,
    control,
    errors,
  };
};

export { useAppForm };
