import {
  FormControl,
  FormControlErrors,
  FormControlValues,
  ValidationSchema,
} from 'common/types/types';
import { getFormValidationResolver } from 'helpers/helpers';
import {
  FieldValues,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormSetValue,
} from 'react-hook-form';

type UseAppFormArgs = {
  defaultValues: Record<string, unknown>;
  validationSchema?: ValidationSchema;
};

type UseAppFormResult<T extends FormControlValues = FormControlValues> = {
  control: FormControl;
  errors: FormControlErrors;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  handleSubmit: UseFormHandleSubmit<T>;
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
    control,
    errors,
  };
};

export { useAppForm };
