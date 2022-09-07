import {
  HttpCode,
  InterviewsByIdResponseDto,
  InterviewsGetAllItemResponseDto,
  InterviewsResponseDto,
  UserSignInResponseDto,
} from 'guruhub-shared';

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
} from '~/tests/json-schemas/json-schemas';

describe('Interview creating flow', () => {
  let intervieweeUserId: number;
  let categoryId: number;
  let interviewId: number;

  before(() => apiSessionStorage.addAndEnterSession('default'));
  after(() => apiSessionStorage.removeSession('default'));

  it('Signing in as a student', async () => {
    const response = (await authService.signIn(
      testsConfig.users.student,
    )) as Response<UserSignInResponseDto>;

    response.should.have.status(HttpCode.OK);
    response.should.have.normalExecutionTime;
    response.body.should.have.jsonSchema(signInResponseSchema);
    response.body.user.email.should.be.equal(testsConfig.users.student.email);

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
      it(`Get 403 FORBIDDEN error while trying to get all interviews as ${loginData.email}`, async () => {
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
      it(`Get 403 FORBIDDEN error while trying to get one interview as ${loginData.email}`, async () => {
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
