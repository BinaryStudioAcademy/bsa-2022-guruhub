import {
  CourseGetResponseDto,
  HttpCode,
  sanitizeHTML,
  UserSignInResponseDto,
  VendorGetResponseDto,
} from 'guruhub-shared';

import { Response, UdemyCourseInfo } from '~/lib/common/types/types';
import {
  apiSessionStorage,
  authService,
  coursesService,
  httpService,
  udemyService,
} from '~/lib/services/services';
import {
  courseCreateResponseSchema,
  courseSchema,
  signInResponseSchema,
} from '~/tests/json-schemas/json-schemas';

describe('Course creation tests', () => {
  const udemyVendorExpected: Pick<VendorGetResponseDto, 'key' | 'name'> = {
    key: 'udemy',
    name: 'Udemy',
  };

  let course1: UdemyCourseInfo;
  let course2: UdemyCourseInfo;

  let course1CreateExpected: Pick<
    CourseGetResponseDto,
    'category' | 'description' | 'title'
  >;

  let course2CreateExpected: Pick<
    CourseGetResponseDto,
    'category' | 'description' | 'title'
  >;

  let course1Expected: Pick<
    CourseGetResponseDto,
    'id' | 'category' | 'description' | 'title'
  >;

  let course2Expected: Pick<
    CourseGetResponseDto,
    'id' | 'category' | 'description' | 'title'
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
    this.timeout(100000);

    course1 = await udemyService.getRandomCourseInfo();

    course1CreateExpected = {
      category: null,
      description: sanitizeHTML(course1.course.description),
      title: course1.course.title,
    };
  });

  before('should get second course info from Udemy', async function () {
    this.timeout(100000);

    do {
      course2 = await udemyService.getRandomCourseInfo();
    } while (course1.id === course2.id);

    course2CreateExpected = {
      category: null,
      description: sanitizeHTML(course2.course.description),
      title: course2.course.title,
    };
  });

  it('should create the first course without www prefix in url using id', async function () {
    this.timeout(100000);

    const urlWithId = course1.course.url
      .split('/')
      .map((part, index) => (index === 2 ? course1.id : part))
      .join('/');

    const url = `https://udemy.com${urlWithId}`;

    const response = await coursesService.create({ url });

    response.should.have.status(HttpCode.CREATED);
    response.body.should.have.jsonSchema(courseCreateResponseSchema);
    response.body.should.deep.include(course1CreateExpected);
    response.body.vendor.should.deep.include(udemyVendorExpected);

    course1Expected = {
      ...course1CreateExpected,
      id: response.body.id,
    };
  });

  it('should return correct info for the first course', async () => {
    const response = await coursesService.getOne(course1Expected.id);

    response.should.have.normalExecutionTime;
    response.should.have.status(HttpCode.OK);
    response.body.should.have.jsonSchema(courseSchema);
    response.body.should.deep.include(course1Expected);
    response.body.vendor.should.deep.include(udemyVendorExpected);
  });

  it('should create the second course with www prefix in url using slug', async function () {
    this.timeout(100000);

    const url = `https://www.udemy.com${course2.course.url}`;

    const response = await coursesService.create({ url });

    response.should.have.status(HttpCode.CREATED);
    response.body.should.have.jsonSchema(courseCreateResponseSchema);
    response.body.should.deep.include(course2CreateExpected);
    response.body.vendor.should.deep.include(udemyVendorExpected);

    course2Expected = {
      ...course2CreateExpected,
      id: response.body.id,
    };
  });

  it('should return correct info for the second course', async () => {
    const response = await coursesService.getOne(course2Expected.id);

    response.should.have.normalExecutionTime;
    response.should.have.status(HttpCode.OK);
    response.body.should.have.jsonSchema(courseSchema);
    response.body.should.deep.include(course2Expected);
    response.body.vendor.should.deep.include(udemyVendorExpected);
  });
});
