import { genSalt as genPasswordSalt, hash as hashPassword } from 'bcrypt';
import { InterviewStatus } from 'guruhub-shared';
import { Knex } from 'knex';

type UserCreateData = {
  fullName: string;
  email: string;
  password: string;
};

type CourseCreateData = {
  title: string;
  description: string;
  url: string;
  vendorKey: string;
  categoryKey: string;
  mentor?: UserCreateData;
};

type UserPasswordData = {
  salt: string;
  hash: string;
};

const ID_ALPHABET =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-';

const USER_PASSWORD_SALT_ROUNDS = 10;

const TableName = {
  COURSES: 'courses',
  USERS: 'users',
  USER_DETAILS: 'user_details',
  INTERVIEWS: 'interviews',
  VENDORS: 'vendors',
  CATEGORIES: 'course_categories',
  COURSES_TO_MENTORS: 'courses_to_mentors',
} as const;

const ColumnName = {
  ID: 'id',
  KEY: 'key',
} as const;

const coursesToCreate: CourseCreateData[] = [
  {
    title: 'Javascript Basics',
    description: 'The basics',
    url: 'testjavascriptbasics',
    vendorKey: 'udemy',
    categoryKey: 'javascript',
    mentor: {
      fullName: 'JS Mentor',
      email: 'test.jsmentor@guruhub.club',
      password: 'Pa55word',
    },
  },
  {
    title: 'Python Basics',
    description: 'The basics',
    url: 'testpythonbasics',
    vendorKey: 'coursera',
    categoryKey: 'python',
    mentor: {
      fullName: 'Python Mentor',
      email: 'test.pythonmentor@guruhub.club',
      password: 'Pa55word',
    },
  },
  {
    title: 'C# Basics',
    description: 'The basics',
    url: 'testcsharpbasics',
    vendorKey: 'edx',
    categoryKey: 'c_sharp',
    mentor: {
      fullName: 'C# Mentor',
      email: 'test.csharpmentor@guruhub.club',
      password: 'Pa55word',
    },
  },
  {
    title: 'Javascript Advanced',
    description: 'Advanced level',
    url: 'testjavascriptadvanced',
    vendorKey: 'udemy',
    categoryKey: 'javascript',
  },
  {
    title: 'Python Advanced',
    description: 'Advanced level',
    url: 'testpythonadvanced',
    vendorKey: 'coursera',
    categoryKey: 'python',
  },
  {
    title: 'C# Advanced',
    description: 'Advanced level',
    url: 'testcsharpadvanced',
    vendorKey: 'edx',
    categoryKey: 'c_sharp',
  },
];

async function hashUserPassword(password: string): Promise<UserPasswordData> {
  const salt = await genPasswordSalt(USER_PASSWORD_SALT_ROUNDS);
  const hash = await hashPassword(password, salt);

  return { salt, hash };
}

function generateRandomId(length = 16): string {
  return new Array(length)
    .fill(null)
    .map(() => {
      const random = Math.random();
      const index = Math.floor(random * ID_ALPHABET.length);

      return ID_ALPHABET[index];
    })
    .join('');
}

async function seed(knex: Knex): Promise<void> {
  const vendors = await knex(TableName.VENDORS).select(
    ColumnName.ID,
    ColumnName.KEY,
  );

  const categories = await knex(TableName.CATEGORIES).select(
    ColumnName.ID,
    ColumnName.KEY,
  );

  const vendorsByKey = Object.fromEntries(
    vendors.map((vendor) => [vendor.key, vendor]),
  );

  const categoriesByKey = Object.fromEntries(
    categories.map((category) => [category.key, category]),
  );

  await Promise.all(
    coursesToCreate.map(
      async ({ title, description, url, vendorKey, categoryKey, mentor }) => {
        url = `/course/${url}/`;

        const existingCourse = await knex(TableName.COURSES)
          .select(ColumnName.ID)
          .where({ url })
          .first();

        if (existingCourse) {
          return;
        }

        const categoryId = categoriesByKey[categoryKey].id;

        const courseData = {
          title,
          description,
          url,
          vendorId: vendorsByKey[vendorKey].id,
          courseCategoryId: categoryId,
          originalId: generateRandomId(),
        };

        const [{ id: courseId }] = await knex(TableName.COURSES)
          .insert(courseData)
          .returning(ColumnName.ID);

        if (!mentor) {
          return;
        }

        const { fullName, email, password } = mentor;

        const { salt: passwordSalt, hash: passwordHash } =
          await hashUserPassword(password);

        const userData = {
          email,
          passwordSalt,
          passwordHash,
        };

        const [{ id: userId }] = await knex(TableName.USERS)
          .insert(userData)
          .returning(ColumnName.ID);

        const detailsData = {
          fullName,
          gender: 'other',
          userId,
        };

        await knex(TableName.USER_DETAILS).insert(detailsData);

        const interviewData = {
          interviewDate: new Date().toISOString(),
          status: InterviewStatus.COMPLETED,
          categoryId,
          intervieweeUserId: userId,
        };

        await knex(TableName.INTERVIEWS).insert(interviewData);

        const coursesToMentorsData = {
          userId,
          courseId,
        };

        await knex(TableName.COURSES_TO_MENTORS).insert(coursesToMentorsData);
      },
    ),
  );
}

export { seed };
