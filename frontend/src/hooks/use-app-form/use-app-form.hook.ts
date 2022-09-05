import {
  FormControl,
  FormControlErrors,
  FormControlGetValues,
  FormControlSetValues,
  FormControlValues,
  ValidationSchema,
} from 'common/types/types';
import { getFormValidationResolver } from 'helpers/helpers';
import {
  FieldValues,
  useForm,
  UseFormHandleSubmit,
  UseFormReset,
  UseFormWatch,
  ValidationMode,
} from 'react-hook-form';

type UseAppFormArgs = {
  defaultValues: Record<string, unknown>;
  validationSchema?: ValidationSchema;
  mode?: keyof ValidationMode;
};

type UseAppFormResult<T extends FormControlValues = FormControlValues> = {
  control: FormControl;
  errors: FormControlErrors;
  setValue: FormControlSetValues;
  getValues: FormControlGetValues;
  watch: UseFormWatch<FieldValues>;
  handleSubmit: UseFormHandleSubmit<T>;
  reset: UseFormReset<T>;
  setFocus: (name: string) => void;
};

const useAppForm = <T extends FormControlValues = FormControlValues>({
  validationSchema,
  defaultValues,
  mode,
}: UseAppFormArgs): UseAppFormResult<T> => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    setFocus,
    formState: { errors },
  } = useForm<FormControlValues>({
    mode,
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
    watch,
    control,
    errors,
    setFocus,
  };
};

export { useAppForm };
