import { genSalt as genPasswordSalt, hash as hashPassword } from 'bcrypt';
import { Knex } from 'knex';

type GroupCreateData = {
  key: string;
  permissions: string[];
};

type UserCreateData = {
  fullName: string;
  email: string;
  password: string;
  group?: GroupCreateData;
};

type UserPasswordData = {
  salt: string;
  hash: string;
};

const USER_PASSWORD_SALT_ROUNDS = 10;

const TableName = {
  USERS: 'users',
  GROUPS: 'groups',
  PERMISSIONS: 'permissions',
  USERS_TO_GROUPS: 'users_to_groups',
  GROUPS_TO_PERMISSIONS: 'groups_to_permissions',
} as const;

const ColumnName = {
  ID: 'id',
  KEY: 'key',
  EMAIL: 'email',
} as const;

const usersToCreate: UserCreateData[] = [
  {
    fullName: 'Student',
    email: 'test.student@guruhub.club',
    password: 'Pa55word',
  },
  {
    fullName: 'Interviews Manager',
    email: 'test.interviewsmanager@guruhub.club',
    password: 'Pa55word',
    group: {
      key: 'interviews_manager',
      permissions: ['manage_interviews'],
    },
  },
  {
    fullName: 'Interviewer',
    email: 'test.interviewer@guruhub.club',
    password: 'Pa55word',
    group: {
      key: 'interviewer',
      permissions: ['manage_interview'],
    },
  },
  {
    fullName: 'Categories Manager',
    email: 'test.categoriesmanager@guruhub.club',
    password: 'Pa55word',
    group: {
      key: 'categories_manager',
      permissions: ['manage_categories'],
    },
  },
  {
    fullName: 'Mentoring Manager',
    email: 'test.mentoringmanager@guruhub.club',
    password: 'Pa55word',
    group: {
      key: 'mentoring_manager',
      permissions: ['manage_mentoring'],
    },
  },
];

async function hashUserPassword(password: string): Promise<UserPasswordData> {
  const salt = await genPasswordSalt(USER_PASSWORD_SALT_ROUNDS);
  const hash = await hashPassword(password, salt);

  return { salt, hash };
}

async function up(knex: Knex): Promise<void> {
  const permissions = await knex(TableName.PERMISSIONS).select('*');

  await Promise.all(
    usersToCreate.map(async ({ fullName, group, email, password }) => {
      const { salt: passwordSalt, hash: passwordHash } = await hashUserPassword(
        password,
      );

      const userData = {
        fullName,
        email,
        passwordSalt,
        passwordHash,
      };

      const [{ id: userId }] = await knex(TableName.USERS)
        .insert(userData)
        .returning('id');

      if (!group) {
        return;
      }

      const groupData = { name: fullName, key: group.key };

      const [{ id: groupId }] = await knex(TableName.GROUPS)
        .insert(groupData)
        .returning('id');

      const groupsToPermissionsData = group.permissions.map(
        (permissionKey) => ({
          permissionId: permissions.find(({ key }) => permissionKey === key).id,
          groupId,
        }),
      );

      await knex(TableName.GROUPS_TO_PERMISSIONS).insert(
        groupsToPermissionsData,
      );

      const usersToGroupsData = { userId, groupId };

      await knex(TableName.USERS_TO_GROUPS).insert(usersToGroupsData);
    }),
  );
}

async function down(knex: Knex): Promise<void> {
  await knex(TableName.USERS)
    .whereIn(
      ColumnName.EMAIL,
      usersToCreate.map(({ email }) => email),
    )
    .del();

  await knex(TableName.GROUPS)
    .whereIn(
      ColumnName.KEY,
      (
        usersToCreate
          .filter(({ group }) => Boolean(group))
          .map(({ group }) => group) as GroupCreateData[]
      ).map(({ key }) => key),
    )
    .del();
}

export { down, up };
