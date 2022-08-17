import {
  HttpCode,
  HttpStatusMessage,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
  UserWithPermissions,
} from 'guruhub-shared';

import { JWT_TOKEN_REGEX } from '~/lib/common/constants/constants';
import { Response } from '~/lib/common/types/types';
import {
  apiSessionStorage,
  authService,
  httpService,
} from '~/lib/services/services';
import {
  errorResponseSchema,
  signInResponseSchema,
  signUpResponseSchema,
  userWithPermissionsSchema,
} from '~/tests/json-schemas/json-schemas';
import { signUpRequestMock } from '~/tests/mocks/mocks';

describe('Sign up tests', () => {
  let signUpData: UserSignUpRequestDto;
  let expectedSignUpResponse: Pick<UserWithPermissions, 'fullName' | 'email'>;
  let expectedUserData: Pick<UserWithPermissions, 'id' | 'fullName' | 'email'>;

  before(() => apiSessionStorage.addAndEnterSession('default'));

  after(() => apiSessionStorage.removeSession('default'));

  it('should reject to sign up with existing email', async () => {
    const response = await authService.signUp(
      signUpRequestMock(testsConfig.users.student.email),
    );

    response.should.have.status(HttpCode.UNAUTHORIZED);
    response.should.have.normalExecutionTime;

    response.body.should.be.deep.include({
      statusCode: HttpCode.UNAUTHORIZED,
      error: HttpStatusMessage.UNAUTHORIZED,
    });

    response.body.should.have.jsonSchema(errorResponseSchema);
  });

  it('should sign up successfully with valid data', async () => {
    signUpData = signUpRequestMock();

    expectedSignUpResponse = {
      fullName: signUpData.fullName,
      email: signUpData.email,
    };

    const response = (await authService.signUp(
      signUpData,
    )) as Response<UserSignUpResponseDto>;

    response.should.have.status(HttpCode.CREATED);
    response.should.have.normalExecutionTime;
    response.body.user.should.deep.include(expectedSignUpResponse);
    JWT_TOKEN_REGEX.test(response.body.token).should.be.true;
    response.body.should.have.jsonSchema(signUpResponseSchema);

    expectedUserData = {
      id: response.body.user.id,
      ...expectedSignUpResponse,
    };

    httpService.setToken(response.body.token);
  });

  it('should get correct current user', async () => {
    const response = await authService.getCurrentUser();

    response.should.have.status(HttpCode.OK);
    response.should.have.normalExecutionTime;
    response.body.should.deep.include(expectedUserData);
    response.body.should.have.jsonSchema(userWithPermissionsSchema);

    httpService.removeToken();
  });

  it('should successfully sign in with correct data', async () => {
    const response = (await authService.signIn({
      email: signUpData.email,
      password: signUpData.password,
    })) as Response<UserSignUpResponseDto>;

    response.should.have.status(HttpCode.OK);
    response.should.have.normalExecutionTime;
    response.body.user.should.deep.include(expectedUserData);
    JWT_TOKEN_REGEX.test(response.body.token).should.be.true;
    response.body.should.have.jsonSchema(signInResponseSchema);

    httpService.setToken(response.body.token);
  });

  it('should get correct current user after sign in', async () => {
    const response = await authService.getCurrentUser();

    response.should.have.status(HttpCode.OK);
    response.should.have.normalExecutionTime;
    response.body.should.deep.include(expectedUserData);
    response.body.should.have.jsonSchema(userWithPermissionsSchema);

    httpService.removeToken();
  });
});
