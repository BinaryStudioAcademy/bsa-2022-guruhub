import Joi from 'joi';
import { UserPayloadKey, UserValidationMessage } from '~/common/enums/enums';
import { CreateUserPayload } from '~/common/types/types';

const userSignUpValidationSchema = Joi.object<CreateUserPayload>({
	[UserPayloadKey.EMAIL]: Joi.string()
		.trim()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			'string.email': UserValidationMessage.EMAIL_INCORRECT,
			'string.empty': UserValidationMessage.EMAIL_REQUIRED
		})
});

export { userSignUpValidationSchema };
