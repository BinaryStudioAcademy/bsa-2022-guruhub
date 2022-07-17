import {
	FormControl,
	FormControlErrors,
	FormControlPath
} from 'common/types/types';
import { useFormControl } from 'hooks/hooks';
import { InputType } from 'common/enums/enums';
import { ErrorMessage } from 'components/common/common';

type Props = {
	control: FormControl;
	errors: FormControlErrors;
	label: string;
	name: FormControlPath;
	placeholder?: string;
	type?: InputType;
};

const Input: React.FC<Props> = ({
	control,
	errors,
	label,
	name,
	placeholder = '',
	type = InputType.TEXT
}) => {
	const { field } = useFormControl({ name, control });

	return (
		<label>
			<span>{label}</span>
			<input {...field} type={type} placeholder={placeholder} />
			<span>
				<ErrorMessage errors={errors} name={name} />
			</span>
		</label>
	);
};

export { Input };
