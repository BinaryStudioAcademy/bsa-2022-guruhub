import { ButtonType, InputType, UserPayloadKey } from 'common/enums/enums';
import { CreateUserPayload } from 'common/types/types';
import { Button, Input } from 'components/common/common';
import { useAppForm } from 'hooks/hooks';
import { userSignUpValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_SIGN_UP_PAYLOAD } from './common';

type Props = {
	onSubmit: (payload: CreateUserPayload) => void;
};

const SignUpForm: React.FC<Props> = ({ onSubmit }) => {
	const { control, errors, handleSubmit } = useAppForm<CreateUserPayload>({
		defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
		validationSchema: userSignUpValidationSchema
	});

	return (
		<>
			<h3>Sign Up</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<p>
					<Input
						type={InputType.TEXT}
						label="Email"
						placeholder="Enter your email"
						name={UserPayloadKey.EMAIL}
						control={control}
						errors={errors}
					/>
				</p>
				<Button type={ButtonType.SUBMIT} label="Sign up" />
			</form>
		</>
	);
};

export { SignUpForm };
