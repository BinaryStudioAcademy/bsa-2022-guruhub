import {
  CategoryGetAllItemResponseDto,
  CourseGetResponseDto,
  ExceptionMessage,
  HttpCode,
  HttpErrorDto,
  HttpStatusMessage,
  sanitizeHTML,
  UdemyCourseGetResponseDto,
  UserSignInResponseDto,
} from 'guruhub-shared';

import { CourseCreateExpected, Response } from '~/lib/common/types/types';
import { getRandomArrayElement, withTestData } from '~/lib/helpers/helpers';
import {
  apiSessionStorage,
  authService,
  categoriesService,
  coursesService,
  httpService,
  udemyService,
} from '~/lib/services/services';
import {
  allCategoriesSchema,
  courseCreateResponseSchema,
  signInResponseSchema,
} from '~/tests/json-schemas/json-schemas';

describe('Course category updating tests', () => {
  before(() => apiSessionStorage.addAndEnterSession('default'));

  after(() => apiSessionStorage.removeSession('default'));

  const udemyVendorExpected = {
    key: 'udemy',
    name: 'Udemy',
  };

  const noPermissionUsers = {
    student: testsConfig.users.student,
    jsMentor: testsConfig.users.jsMentor,
    pythonMentor: testsConfig.users.pythonMentor,
    csharpMentor: testsConfig.users.csharpMentor,
    interviewer: testsConfig.users.interviewer,
    interviewsManager: testsConfig.users.interviewsManager,
    mentoringManager: testsConfig.users.mentoringManager,
  } as const;

  let course: UdemyCourseGetResponseDto;
  let courseCreateExpected: CourseCreateExpected;
  let courseId: number;

  let category1: CategoryGetAllItemResponseDto;
  let category2: CategoryGetAllItemResponseDto;

  before('should sign in as categories manager', async () => {
    const response = (await authService.signIn(
      testsConfig.users.categoriesManager,
    )) as Response<UserSignInResponseDto>;

    response.should.have.normalExecutionTime;
    response.should.have.status(HttpCode.OK);
    response.body.should.have.jsonSchema(signInResponseSchema);

    httpService.setToken(response.body.token);
  });

  before('should get course info from Udemy', async function () {
    this.timeout(60000);

    course = await udemyService.getRandomCourse();

    courseCreateExpected = {
      category: null,
      description: sanitizeHTML(course.description),
      title: course.title,
      vendor: udemyVendorExpected,
    };
  });

  before('should create the course', async function () {
    this.timeout(60000);

    const url = `https://udemy.com${course.url}`;

    const response = (await coursesService.create({
      url,
    })) as Response<CourseGetResponseDto>;

    response.should.have.status(HttpCode.CREATED);
    response.body.should.have.jsonSchema(courseCreateResponseSchema);
    response.body.should.include.deep.keys(courseCreateExpected);

    courseId = response.body.id;
  });

  before('should get 2 random categories', async () => {
    const response = await categoriesService.getAll();

    response.should.have.normalExecutionTime;
    response.should.have.status(HttpCode.OK);
    response.body.should.have.jsonSchema(allCategoriesSchema);

    category1 = getRandomArrayElement(response.body.items);

    do {
      category2 = getRandomArrayElement(response.body.items);
    } while (category1.id === category2.id);
  });

  withTestData(
    Object.entries(noPermissionUsers).map(([name, loginData]) => ({
      name,
      loginData,
    })),
    ({ name, loginData }) => {
      it(`should reject to update category for user without required permission: ${name}`, async () => {
        apiSessionStorage.addAndEnterSession(name);

        const loginResponse = (await authService.signIn(
          loginData,
        )) as Response<UserSignInResponseDto>;

        loginResponse.should.have.normalExecutionTime;
        loginResponse.should.have.status(HttpCode.OK);
        loginResponse.body.should.have.jsonSchema(signInResponseSchema);

        httpService.setToken(loginResponse.body.token);

        const response = (await coursesService.updateCategory(
          courseId,
          category1.id,
        )) as Response<HttpErrorDto>;

        apiSessionStorage.enterSessionAndRemovePrevious('default');

        response.should.have.normalExecutionTime;
        response.should.have.status(HttpCode.FORBIDDEN);

        response.body.should.be.eql({
          statusCode: HttpCode.FORBIDDEN,
          error: HttpStatusMessage.FORBIDDEN,
          message: ExceptionMessage.PERMISSION_LACK,
        });
      });
    },
  );

  it('should update category on course that has no category', async () => {
    const response = (await coursesService.updateCategory(
      courseId,
      category1.id,
    )) as Response<CourseGetResponseDto>;

    response.should.have.normalExecutionTime;
    response.should.have.status(HttpCode.OK);

    response.body.should.include.deep.keys({
      courseCategoryId: category1.id,
      category: category1,
    });
  });

  it('should get correct course data after first update', async () => {
    const response = await coursesService.getOne(courseId);

    response.should.have.normalExecutionTime;
    response.should.have.status(HttpCode.OK);

    response.body.should.include.deep.keys({
      courseCategoryId: category1.id,
      category: category1,
    });
  });

  it('should update category on course that already has a category', async () => {
    const response = (await coursesService.updateCategory(
      courseId,
      category2.id,
    )) as Response<CourseGetResponseDto>;

    response.should.have.normalExecutionTime;
    response.should.have.status(HttpCode.OK);

    response.body.should.include.deep.keys({
      courseCategoryId: category2.id,
      category: category2,
    });
  });

  it('should get correct course data after second update', async () => {
    const response = await coursesService.getOne(courseId);

    response.should.have.normalExecutionTime;
    response.should.have.status(HttpCode.OK);

    response.body.should.include.deep.keys({
      courseCategoryId: category1.id,
      category: category1,
    });
  });
});
