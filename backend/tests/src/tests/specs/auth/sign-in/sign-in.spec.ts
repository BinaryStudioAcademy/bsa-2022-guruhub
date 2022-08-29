import {
  ExceptionMessage,
  HttpCode,
  HttpErrorDto,
  HttpStatusMessage,
  UserSignInResponseDto,
  UserValidationMessage,
} from 'guruhub-shared';

import { JWT_TOKEN_REGEX } from '~/lib/common/constants/constants';
import { Response } from '~/lib/common/types/types';
import { withTestData } from '~/lib/helpers/helpers';
import {
  apiSessionStorage,
  authService,
  httpService,
} from '~/lib/services/services';
import {
  errorResponseSchema,
  signInResponseSchema,
  userWithPermissionsSchema,
} from '~/tests/json-schemas/json-schemas';

describe('Sign in tests', () => {
  before(() => apiSessionStorage.addAndEnterSession('default'));

  after(() => apiSessionStorage.removeSession('default'));

  it('should sign in with valid data', async () => {
    const response = (await authService.signIn(
      testsConfig.users.student,
    )) as Response<UserSignInResponseDto>;

    response.should.have.status(HttpCode.OK);
    response.should.have.normalExecutionTime;
    response.body.should.have.jsonSchema(signInResponseSchema);
    JWT_TOKEN_REGEX.test(response.body.token).should.be.true;
    response.body.user.email.should.be.equal(testsConfig.users.student.email);

    httpService.setToken(response.body.token);
  });

  it('should return authorized user data', async () => {
    const response = await authService.getCurrentUser();

    response.should.have.status(HttpCode.OK);
    response.should.have.normalExecutionTime;
    response.body.should.have.jsonSchema(userWithPermissionsSchema);
    response.body.email.should.be.equal(testsConfig.users.student.email);
  });

  withTestData(
    [
      {
        email: testsConfig.users.student.email,
        password: 'incorrectPas$word',
        message: ExceptionMessage.BAD_CREDENTIALS,
      },
      {
        email: testsConfig.users.student.email,
        password: '',
        message: UserValidationMessage.PASSWORD_REQUIRE,
      },
      {
        email: 'unexisting@email.com',
        password: testsConfig.users.student.password,
        message: ExceptionMessage.BAD_CREDENTIALS,
      },
      {
        email: '',
        password: testsConfig.users.student.password,
        message: UserValidationMessage.EMAIL_REQUIRE,
      },
      { email: '', password: '', message: UserValidationMessage.EMAIL_REQUIRE },
      {
        email: 'unexisting@email.com',
        password: '123456781234567812345678123456789',
        message: UserValidationMessage.PASSWORD_MAX_LENGTH,
      },
      {
        email: 'unexisting@email.com',
        password: '1234567',
        message: UserValidationMessage.PASSWORD_MIN_LENGTH,
      },
      {
        email: 'a@a',
        password: '12345678',
        message: UserValidationMessage.EMAIL_MIN_LENGTH,
      },
      {
        email: '@aaaaaa',
        password: '12345678',
        message: UserValidationMessage.EMAIL_WRONG,
      },
      {
        email: ' a@aa ',
        password: '12345678',
        message: UserValidationMessage.EMAIL_MIN_LENGTH,
      },
      {
        email: 'aaa@aaa',
        password: '12345678',
        message: UserValidationMessage.EMAIL_WRONG,
      },
      {
        email: 'aaa.aaa',
        password: '12345678',
        message: UserValidationMessage.EMAIL_WRONG,
      },
      {
        email: 'aaa.aaa@aaa',
        password: '12345678',
        message: UserValidationMessage.EMAIL_WRONG,
      },
      {
        email: 'aa@aa@a.a',
        password: '12345678',
        message: UserValidationMessage.EMAIL_WRONG,
      },
    ],
    ({ email, password, message }) => {
      it(`should return an error with invalid data: email - ${email}, password - ${password}`, async () => {
        const response = (await authService.signIn({
          email,
          password,
        })) as Response<HttpErrorDto>;

        response.should.have.status(HttpCode.BAD_REQUEST);
        response.should.have.normalExecutionTime;
        response.body.should.have.jsonSchema(errorResponseSchema);
        response.body.error.should.be.equal(HttpStatusMessage.BAD_REQUEST);
        response.body.message.should.be.equal(message);
      });
    },
  );
});
