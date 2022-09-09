import {
  HttpCode,
  HttpStatusMessage,
  InterviewsByIdResponseDto,
  InterviewsGetAllItemResponseDto,
  InterviewsResponseDto,
  InterviewStatus,
  UserDetailsResponseDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
  UserWithPermissions,
} from 'guruhub-shared';

import { JWT_TOKEN_REGEX } from '~/lib/common/constants/regex.constants';
import { Response } from '~/lib/common/types/types';
import { withTestData } from '~/lib/helpers/helpers';
import {
  apiSessionStorage,
  authService,
  httpService,
  interviewService,
} from '~/lib/services/services';
import {
  errorResponseSchema,
  interviewCreationSchema,
  interviewGetAllSchema,
  signInResponseSchema,
  signUpResponseSchema,
} from '~/tests/json-schemas/json-schemas';
import { signUpRequestMock } from '~/tests/mocks/mocks';

describe('Interview creating flow', () => {
  let signUpData: UserSignUpRequestDto;
  let intervieweeUserId: number;
  let categoryId: number;
  let interviewId: number;

  let expectedUserDetails: Pick<UserDetailsResponseDto, 'fullName'>;
  let expectedSignUpResponse: Pick<UserWithPermissions, 'email'>;

  before(() => apiSessionStorage.addAndEnterSession('default'));

  after(async () => {
    const response = await interviewService.updateInterviewStatus(interviewId, {
      interviewerUserId: 1,
      status: InterviewStatus.REJECTED,
      interviewDate: null,
    });

    response.should.have.status(HttpCode.OK);
    response.should.have.normalExecutionTime;
    response.should.have.jsonSchema(interviewGetAllSchema);

    apiSessionStorage.removeSession('default');
  });

  it('Signing up as a new user without permissions', async () => {
    signUpData = signUpRequestMock();

    expectedSignUpResponse = {
      email: signUpData.email,
    };

    expectedUserDetails = {
      fullName: signUpData.fullName,
    };

    const response = (await authService.signUp(
      signUpData,
    )) as Response<UserSignUpResponseDto>;

    response.should.have.status(HttpCode.CREATED);
    response.should.have.normalExecutionTime;
    response.body.should.have.jsonSchema(signUpResponseSchema);
    response.body.user.should.deep.include(expectedSignUpResponse);
    response.body.user.userDetails.should.deep.include(expectedUserDetails);
    JWT_TOKEN_REGEX.test(response.body.token).should.be.true;

    intervieweeUserId = response.body.user.id;
    categoryId = 1;

    httpService.setToken(response.body.token);
  });

  it('Creating new interview', async () => {
    const response = (await interviewService.createNewInterview({
      intervieweeUserId: intervieweeUserId,
      categoryId: categoryId,
    })) as Response<InterviewsResponseDto>;

    interviewId = response.body.id;

    response.should.have.status(HttpCode.CREATED);
    response.should.have.normalExecutionTime;
    response.body.should.have.jsonSchema(interviewCreationSchema);
  });

  withTestData(
    [
      testsConfig.users.student,
      testsConfig.users.jsMentor,
      testsConfig.users.pythonMentor,
      testsConfig.users.csharpMentor,
      testsConfig.users.categoriesManager,
    ],
    (loginData) => {
      it(`Get ${HttpCode.FORBIDDEN} ${HttpStatusMessage.FORBIDDEN} error while trying to get all interviews as ${loginData.email}`, async () => {
        apiSessionStorage.addAndEnterSession(loginData.email);

        const loginResponse = (await authService.signIn(
          loginData,
        )) as Response<UserSignInResponseDto>;

        httpService.setToken(loginResponse.body.token);

        const response = await interviewService.getAllInterviews();

        apiSessionStorage.enterSessionAndRemovePrevious('default');

        loginResponse.should.have.status(HttpCode.OK);
        loginResponse.should.have.normalExecutionTime;
        loginResponse.body.should.have.jsonSchema(signInResponseSchema);

        response.should.have.status(HttpCode.FORBIDDEN);
        response.should.have.normalExecutionTime;
        response.body.should.have.jsonSchema(errorResponseSchema);
      });
    },
  );

  it('Signing in as interviews manager', async () => {
    const response = (await authService.signIn(
      testsConfig.users.interviewsManager,
    )) as Response<UserSignInResponseDto>;

    response.should.have.status(HttpCode.OK);
    response.should.have.normalExecutionTime;
    response.body.should.have.jsonSchema(signInResponseSchema);

    response.body.user.email.should.be.equal(
      testsConfig.users.interviewsManager.email,
    );

    httpService.setToken(response.body.token);
  });

  it('Successfully getting list of all interviews', async () => {
    const response =
      (await interviewService.getAllInterviews()) as Response<InterviewsGetAllItemResponseDto>;

    response.should.have.status(HttpCode.OK);
    response.should.have.normalExecutionTime;
    response.body.should.have.jsonSchema(interviewGetAllSchema);
  });

  withTestData(
    [
      testsConfig.users.student,
      testsConfig.users.jsMentor,
      testsConfig.users.pythonMentor,
      testsConfig.users.csharpMentor,
      testsConfig.users.categoriesManager,
    ],
    (loginData) => {
      it(`Get ${HttpCode.FORBIDDEN} ${HttpStatusMessage.FORBIDDEN} error while trying to get one interview as ${loginData.email}`, async () => {
        apiSessionStorage.addAndEnterSession(loginData.email);

        const loginResponse = (await authService.signIn(
          loginData,
        )) as Response<UserSignInResponseDto>;

        httpService.setToken(loginResponse.body.token);

        const response = await interviewService.getInterviewById(interviewId);

        apiSessionStorage.enterSessionAndRemovePrevious('default');

        loginResponse.should.have.status(HttpCode.OK);
        loginResponse.should.have.normalExecutionTime;
        loginResponse.body.should.have.jsonSchema(signInResponseSchema);

        response.should.have.status(HttpCode.FORBIDDEN);
        response.should.have.normalExecutionTime;
        response.body.should.have.jsonSchema(errorResponseSchema);
      });
    },
  );

  it('Signing in as interviews manager', async () => {
    const response = (await authService.signIn(
      testsConfig.users.interviewsManager,
    )) as Response<UserSignInResponseDto>;

    response.should.have.status(HttpCode.OK);
    response.should.have.normalExecutionTime;
    response.body.should.have.jsonSchema(signInResponseSchema);

    response.body.user.email.should.be.equal(
      testsConfig.users.interviewsManager.email,
    );

    httpService.setToken(response.body.token);
  });

  it('Successfully getting info about one interview', async () => {
    const response = (await interviewService.getInterviewById(
      interviewId,
    )) as Response<InterviewsByIdResponseDto>;

    response.should.have.status(HttpCode.OK);
    response.should.have.normalExecutionTime;
    response.body.should.have.jsonSchema(interviewGetAllSchema);
  });
});
