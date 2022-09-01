import {
  ExceptionMessage,
  HttpCode,
  HttpErrorDto,
  HttpStatusMessage,
  UserDetailsResponseDto,
  UserSignInResponseDto,
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
  usersService,
} from '~/lib/services/services';
import {
  errorResponseSchema,
  signInResponseSchema,
  signUpResponseSchema,
} from '~/tests/json-schemas/json-schemas';
import { signUpRequestMock } from '~/tests/mocks/mocks';

describe('Users delete tests', () => {
  const userToDeleteData: UserSignUpRequestDto = signUpRequestMock();
  let expectedUserDetails: Pick<UserDetailsResponseDto, 'fullName'>;
  let expectedSignUpResponse: Pick<UserWithPermissions, 'email'>;
  let userToDeleteId = 0;

  after(() => {
    apiSessionStorage.removeSession('user_to_delete');
    apiSessionStorage.removeSession('student');
    apiSessionStorage.removeSession('uam_manager');
    apiSessionStorage.removeSession('unauthorized');
  });

  before('should create test user to be delete', async () => {
    apiSessionStorage.addAndEnterSession('user_to_delete');

    expectedSignUpResponse = {
      email: userToDeleteData.email,
    };

    expectedUserDetails = {
      fullName: userToDeleteData.fullName,
    };

    const response = (await authService.signUp(
      userToDeleteData,
    )) as Response<UserSignUpResponseDto>;

    httpService.setToken(response.body.token);
    userToDeleteId = response.body.user.id;

    apiSessionStorage.exitSession();

    response.should.have.status(HttpCode.CREATED);
    response.should.have.normalExecutionTime;
    response.body.should.have.jsonSchema(signUpResponseSchema);
    response.body.user.should.deep.include(expectedSignUpResponse);
    response.body.user.userDetails.should.deep.include(expectedUserDetails);
    JWT_TOKEN_REGEX.test(response.body.token).should.be.true;
  });

  before('should log in as a UAM manager', async () => {
    apiSessionStorage.addAndEnterSession('uam_manager');

    const response = (await authService.signIn(
      testsConfig.users.uamManager,
    )) as Response<UserSignInResponseDto>;

    httpService.setToken(response.body.token);

    apiSessionStorage.exitSession();

    response.should.have.status(HttpCode.OK);
    response.should.have.normalExecutionTime;
    response.body.should.have.jsonSchema(signInResponseSchema);
  });

  before('should log in as a student', async () => {
    apiSessionStorage.addAndEnterSession('student');

    const response = (await authService.signIn(
      testsConfig.users.student,
    )) as Response<UserSignInResponseDto>;

    httpService.setToken(response.body.token);

    apiSessionStorage.exitSession();

    response.should.have.status(HttpCode.OK);
    response.should.have.normalExecutionTime;
    response.body.should.have.jsonSchema(signInResponseSchema);
  });

  it(`should return an error after deleting user by user without Manage UAM permission:
        email:${userToDeleteData.email}
        password:${userToDeleteData.password}`, async () => {
    apiSessionStorage.enterSession('student');

    const response = (await usersService.delete(
      userToDeleteId,
    )) as Response<HttpErrorDto>;

    apiSessionStorage.exitSession();

    response.should.have.status(HttpCode.FORBIDDEN);
    response.should.have.normalExecutionTime;
    response.body.should.have.jsonSchema(errorResponseSchema);
    response.body.error.should.be.equal(HttpStatusMessage.FORBIDDEN);
    response.body.message.should.be.equal(ExceptionMessage.PERMISSION_LACK);
  });

  it('should delete user by user with Manage UAM permission', async () => {
    apiSessionStorage.enterSession('uam_manager');

    const response = await usersService.delete(userToDeleteId);

    apiSessionStorage.exitSession();

    response.should.have.status(HttpCode.OK);
    response.should.have.normalExecutionTime;
    response.body.should.be.equal(true);
  });

  it(`should return ${HttpCode.NOT_FOUND} ${HttpStatusMessage.NOT_FOUND} after second attempt to delete user by user with Manage UAM permission`, async () => {
    apiSessionStorage.enterSession('uam_manager');

    const response = await usersService.delete(userToDeleteId);

    apiSessionStorage.exitSession();

    response.should.have.status(HttpCode.NOT_FOUND);
    response.should.have.normalExecutionTime;
    response.body.should.be.equal(false);
  });

  it('should not let deleted user to authorize', async () => {
    apiSessionStorage.enterSession('user_to_delete');

    const response = (await authService.signIn({
      email: userToDeleteData.email,
      password: userToDeleteData.password,
    })) as Response<HttpErrorDto>;

    apiSessionStorage.exitSession();

    response.should.have.status(HttpCode.BAD_REQUEST);
    response.body.should.have.jsonSchema(errorResponseSchema);
    response.body.error.should.be.equal(HttpStatusMessage.BAD_REQUEST);
    response.body.message.should.be.equal(ExceptionMessage.BAD_CREDENTIALS);
    response.should.have.normalExecutionTime;
  });

  it('should reject to delete user for unauthorized user', async () => {
    apiSessionStorage.addAndEnterSession('unauthorized');

    const response = (await usersService.delete(
      userToDeleteId,
    )) as Response<HttpErrorDto>;

    apiSessionStorage.exitSession();

    response.should.have.status(HttpCode.UNAUTHORIZED);
    response.should.have.normalExecutionTime;
    response.body.should.have.jsonSchema(errorResponseSchema);
    response.body.error.should.be.equal(HttpStatusMessage.UNAUTHORIZED);
  });
});
