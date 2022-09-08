import {
  CourseGetResponseDto,
  CourseModulesGetAllItemResponseDto,
  ExceptionMessage,
  HttpCode,
  HttpErrorDto,
  HttpStatusMessage,
  sanitizeHTML,
  UserSignInResponseDto,
  VendorGetResponseDto,
} from 'guruhub-shared';

import { Response, UdemyCourseInfo } from '~/lib/common/types/types';
import { withTestData } from '~/lib/helpers/helpers';
import {
  apiSessionStorage,
  authService,
  coursesService,
  httpService,
  udemyService,
} from '~/lib/services/services';
import {
  allModulesSchema,
  courseCreateResponseSchema,
  courseSchema,
  errorResponseSchema,
  signInResponseSchema,
} from '~/tests/json-schemas/json-schemas';

describe('[LITTLE BIT UNSTABLE IN DEVELOPMENT] Course creation tests', () => {
  const getIdUdemyUrl = (course: UdemyCourseInfo): string => {
    return course.course.url
      .split('/')
      .map((part, index) => (index === 2 ? course.id : part))
      .join('/');
  };

  const udemyVendorExpected = {
    key: 'udemy',
    name: 'Udemy',
  };

  let course1: UdemyCourseInfo;
  let course2: UdemyCourseInfo;

  let course1CreateExpected: Pick<
    CourseGetResponseDto,
    'category' | 'description' | 'title'
  > & {
    vendor: Pick<VendorGetResponseDto, 'key' | 'name'>;
  };

  let course2CreateExpected: Pick<
    CourseGetResponseDto,
    'category' | 'description' | 'title'
  > & {
    vendor: Pick<VendorGetResponseDto, 'key' | 'name'>;
  };

  let course1Expected: Pick<
    CourseGetResponseDto,
    'id' | 'category' | 'description' | 'title'
  > & {
    vendor: Pick<VendorGetResponseDto, 'key' | 'name'>;
  };

  let course2Expected: Pick<
    CourseGetResponseDto,
    'id' | 'category' | 'description' | 'title'
  > & {
    vendor: Pick<VendorGetResponseDto, 'key' | 'name'>;
  };

  let course1ModulesExpected: Array<
    Pick<
      CourseModulesGetAllItemResponseDto,
      'courseId' | 'title' | 'description'
    >
  >;

  let course2ModulesExpected: Array<
    Pick<
      CourseModulesGetAllItemResponseDto,
      'courseId' | 'title' | 'description'
    >
  >;

  before(() => apiSessionStorage.addAndEnterSession('default'));

  after(() => apiSessionStorage.removeSession('default'));

  before('should sign in as student', async () => {
    const response = (await authService.signIn(
      testsConfig.users.student,
    )) as Response<UserSignInResponseDto>;

    response.should.have.normalExecutionTime;
    response.should.have.status(HttpCode.OK);
    response.body.should.have.jsonSchema(signInResponseSchema);

    httpService.setToken(response.body.token);
  });

  before('should get first course info from Udemy', async function () {
    this.timeout(60000);

    course1 = await udemyService.getRandomCourseInfo();

    course1CreateExpected = {
      category: null,
      description: sanitizeHTML(course1.course.description),
      title: course1.course.title,
      vendor: udemyVendorExpected,
    };
  });

  before('should get second course info from Udemy', async function () {
    this.timeout(60000);

    do {
      course2 = await udemyService.getRandomCourseInfo();
    } while (course1.id === course2.id);

    course2CreateExpected = {
      category: null,
      description: sanitizeHTML(course2.course.description),
      title: course2.course.title,
      vendor: udemyVendorExpected,
    };
  });

  withTestData(
    [
      { url: 'https://' },
      { url: 'https://www.' },
      { url: 'www.' },
      { url: 'https://www.udemy' },
      { url: 'https://www.com' },
      { url: 'https://www. .com' },
      { url: 'https://udemy.com/' },
      { url: 'udemy.com' },
      { url: 'www.udemy.com' },
      { url: 'https:/www.udemy.com' },
      { url: 'https//www.udemy.com' },
      { url: 'https:www.udemy.com' },
      { url: 'htp://udemy.com/' },
      { url: 'https://www.udemy.com.' },
      { url: 'https://www.udemy.com/.' },
      { url: 'https://www.udemy.com/..' },
      { url: 'https://udemy.com\\courses\\acourse\\' },
      { url: 'http:\\\\udemy.com/courses/acourse/' },
      { url: 'https://www.udemy.com//courses//course//' },
      { url: 'https://www.udemy.com/' },
      { url: 'https://www.udemy.com/unexistingurl/' },
      { url: 'https://www.udemy.com/courses//' },
    ],
    ({ url }) => {
      it(`should reject to create course with invalid url: ${url}`, async () => {
        const response = (await coursesService.create({
          url,
        })) as Response<HttpErrorDto>;

        response.should.have.status(HttpCode.BAD_REQUEST);
        response.body.should.have.jsonSchema(errorResponseSchema);

        response.body.should.include.keys({
          statusCode: HttpCode.BAD_REQUEST,
          error: HttpStatusMessage.BAD_REQUEST,
        });
      });
    },
  );

  it('should create the first course without www prefix in url using id', async function () {
    this.timeout(60000);

    const url = `https://udemy.com${getIdUdemyUrl(course1)}`;

    const response = (await coursesService.create({
      url,
    })) as Response<CourseGetResponseDto>;

    response.should.have.status(HttpCode.CREATED);
    response.body.should.have.jsonSchema(courseCreateResponseSchema);
    response.body.should.include.deep.keys(course1CreateExpected);

    course1Expected = {
      ...course1CreateExpected,
      id: response.body.id,
    };

    course1ModulesExpected = course1.modules.results.map(
      ({ title, description }) => ({
        courseId: response.body.id,
        title,
        description: description ? sanitizeHTML(description) : null,
      }),
    );
  });

  it('should reject to create the first course second time using slug', async () => {
    const url = `https://www.udemy.com${course1.course.url}`;

    const response = (await coursesService.create({
      url,
    })) as Response<HttpErrorDto>;

    response.should.have.normalExecutionTime;
    response.should.have.status(HttpCode.BAD_REQUEST);
    response.body.should.have.jsonSchema(errorResponseSchema);

    response.body.should.be.eql({
      statusCode: HttpCode.BAD_REQUEST,
      error: HttpStatusMessage.BAD_REQUEST,
      message: ExceptionMessage.COURSE_EXIST,
    });
  });

  it('should return correct info for the first course', async () => {
    const response = await coursesService.getOne(course1Expected.id);

    response.should.have.normalExecutionTime;
    response.should.have.status(HttpCode.OK);
    response.body.should.have.jsonSchema(courseSchema);
    response.body.should.include.deep.keys(course1Expected);
  });

  it('should return correct modules for the first course', async () => {
    const response = await coursesService.getModules(course1Expected.id);

    response.should.have.normalExecutionTime;
    response.should.have.status(HttpCode.OK);
    response.body.should.have.jsonSchema(allModulesSchema);

    response.body.items
      .map(({ courseId, title, description }) => ({
        courseId,
        title,
        description,
      }))
      .should.have.deep.members(course1ModulesExpected);
  });

  it('should create the second course with www prefix in url using slug', async function () {
    this.timeout(60000);

    const url = `https://www.udemy.com${course2.course.url}`;

    const response = (await coursesService.create({
      url,
    })) as Response<CourseGetResponseDto>;

    response.should.have.status(HttpCode.CREATED);
    response.body.should.have.jsonSchema(courseCreateResponseSchema);
    response.body.should.include.deep.keys(course2CreateExpected);

    course2Expected = {
      ...course2CreateExpected,
      id: response.body.id,
    };

    course2ModulesExpected = course2.modules.results.map(
      ({ title, description }) => ({
        courseId: response.body.id,
        title,
        description: description ? sanitizeHTML(description) : null,
      }),
    );
  });

  it('should reject to create the second course second time using id', async () => {
    const url = `https://www.udemy.com${getIdUdemyUrl(course2)}`;

    const response = (await coursesService.create({
      url,
    })) as Response<HttpErrorDto>;

    response.should.have.normalExecutionTime;
    response.should.have.status(HttpCode.BAD_REQUEST);
    response.body.should.have.jsonSchema(errorResponseSchema);

    response.body.should.be.eql({
      statusCode: HttpCode.BAD_REQUEST,
      error: HttpStatusMessage.BAD_REQUEST,
      message: ExceptionMessage.COURSE_EXIST,
    });
  });

  it('should return correct info for the second course', async () => {
    const response = await coursesService.getOne(course2Expected.id);

    response.should.have.normalExecutionTime;
    response.should.have.status(HttpCode.OK);
    response.body.should.have.jsonSchema(courseSchema);
    response.body.should.include.deep.keys(course2Expected);
  });

  it('should return correct modules for the second course', async () => {
    const response = await coursesService.getModules(course2Expected.id);

    response.should.have.normalExecutionTime;
    response.should.have.status(HttpCode.OK);
    response.body.should.have.jsonSchema(allModulesSchema);

    response.body.items
      .map(({ courseId, title, description }) => ({
        courseId,
        title,
        description,
      }))
      .should.have.deep.members(course2ModulesExpected);
  });
});
