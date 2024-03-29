import {
  ExceptionMessage,
  HttpCode,
  HttpErrorDto,
  HttpStatusMessage,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from 'guruhub-shared';

import { JWT_TOKEN_REGEX } from '~/lib/common/constants/constants';
import { Response, UserCreateExpected } from '~/lib/common/types/types';
import { withTestData } from '~/lib/helpers/helpers';
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

  const noPermissionUsers = {
    student: testsConfig.users.student,
    jsMentor: testsConfig.users.jsMentor,
    pythonMentor: testsConfig.users.pythonMentor,
    csharpMentor: testsConfig.users.csharpMentor,
    interviewer: testsConfig.users.interviewer,
    interviewsManager: testsConfig.users.interviewsManager,
    categoriesManager: testsConfig.users.categoriesManager,
    mentoringManager: testsConfig.users.mentoringManager,
  } as const;

  let expectedSignUpResponse: UserCreateExpected;

  let userToDeleteId = 0;

  after(() => {
    apiSessionStorage.removeSession('userToDelete');
    apiSessionStorage.removeSession('unauthorized');

    Object.keys(noPermissionUsers).forEach((name) =>
      apiSessionStorage.removeSession(name),
    );
  });

  before('should create test user to be delete', async () => {
    apiSessionStorage.addAndEnterSession('userToDelete');

    expectedSignUpResponse = {
      email: userToDeleteData.email,
      userDetails: {
        fullName: userToDeleteData.fullName,
      },
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
    response.body.user.should.include.deep.keys(expectedSignUpResponse);
    JWT_TOKEN_REGEX.test(response.body.token).should.be.true;
  });

  withTestData(
    Object.entries(noPermissionUsers).map(([name, loginData]) => ({
      name,
      loginData,
    })),
    ({ name, loginData }) => {
      before(`should sign in as ${name}`, async () => {
        apiSessionStorage.addAndEnterSession(name);

        const response = (await authService.signIn(
          loginData,
        )) as Response<UserSignInResponseDto>;

        httpService.setToken(response.body.token);

        apiSessionStorage.exitSession();

        response.should.have.status(HttpCode.OK);
        response.should.have.normalExecutionTime;
        response.body.should.have.jsonSchema(signInResponseSchema);
      });
    },
  );

  before('should sign in as a UAM manager', async () => {
    apiSessionStorage.addAndEnterSession('uamManager');

    const response = (await authService.signIn(
      testsConfig.users.uamManager,
    )) as Response<UserSignInResponseDto>;

    httpService.setToken(response.body.token);

    apiSessionStorage.exitSession();

    response.should.have.status(HttpCode.OK);
    response.should.have.normalExecutionTime;
    response.body.should.have.jsonSchema(signInResponseSchema);
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

  withTestData(
    Object.keys(noPermissionUsers).map((name) => ({
      name,
    })),
    ({ name }) => {
      it(`should return ${HttpCode.FORBIDDEN} ${HttpStatusMessage.FORBIDDEN} after deleting user as ${name}`, async () => {
        apiSessionStorage.enterSession(name);

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
    },
  );

  it('should delete user as user with Manage UAM permission', async () => {
    apiSessionStorage.enterSession('uamManager');

    const response = await usersService.delete(userToDeleteId);

    apiSessionStorage.exitSession();

    response.should.have.status(HttpCode.OK);
    response.should.have.normalExecutionTime;
    response.body.should.be.equal(true);
  });

  it(`should return ${HttpCode.NOT_FOUND} ${HttpStatusMessage.NOT_FOUND} after second attempt to delete user`, async () => {
    apiSessionStorage.enterSession('uamManager');

    const response = await usersService.delete(userToDeleteId);

    apiSessionStorage.exitSession();

    response.should.have.status(HttpCode.NOT_FOUND);
    response.should.have.normalExecutionTime;
  });

  it('should not let deleted user to sign in', async () => {
    apiSessionStorage.enterSession('userToDelete');

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
});
