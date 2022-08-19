import { genSalt, hash } from 'bcrypt';
import { Knex } from 'knex';

import {
  GroupsConfigureRequestDto,
  UserSignUpRequestDto,
} from '~/common/types/types';

const adminCridentials: UserSignUpRequestDto = {
  email: 'admin@guruhub.club',
  fullName: 'Admin',
  password: 'Pa55word',
};

const ADMIN_GROUP_NAME = 'Admins';
const USER_PASSWORD_SALT_ROUNDS = 10;

const TableName = {
  USERS: 'users',
  PERMISSIONS: 'permissions',
  USERS_TO_GROUPS: 'users_to_groups',
  GROUPS: 'groups',
  GROUPS_TO_PERMISSIONS: 'groups_to_permissions',
};

async function up(knex: Knex): Promise<void> {
  const { email, fullName, password } = adminCridentials;
  const passwordSalt = await genSalt(USER_PASSWORD_SALT_ROUNDS);
  const passwordHash = await hash(password, passwordSalt);
  await knex(TableName.USERS).insert({
    email,
    fullName,
    passwordSalt,
    passwordHash,
  });

  const adminIdObject = await knex(TableName.USERS)
    .select('id')
    .where('email', email);

  const { id: adminId } = adminIdObject[0];

  if (adminIdObject.length === 1 && adminId) {
    const permissionIds = await knex(TableName.PERMISSIONS).select('id');
    const premissionIdsToGive = permissionIds.map(
      (permission) => permission.id,
    );

    const adminPermissionsDto: GroupsConfigureRequestDto = {
      name: ADMIN_GROUP_NAME,
      permissionIds: premissionIdsToGive,
      userIds: [adminId],
    };

    await knex(TableName.GROUPS).insert({
      name: ADMIN_GROUP_NAME,
      key: ADMIN_GROUP_NAME.toLowerCase(),
    });
    const groupIdObject = await knex(TableName.GROUPS)
      .select('id')
      .where('name', ADMIN_GROUP_NAME);

    const { id: groupId } = groupIdObject[0];
    await knex(TableName.USERS_TO_GROUPS).insert({
      groupId,
      userId: adminId,
    });

    await Promise.all(
      adminPermissionsDto.permissionIds.map((permissionId) => {
        return knex(TableName.GROUPS_TO_PERMISSIONS).insert({
          groupId,
          permissionId,
        });
      }),
    );
  }
}

async function down(knex: Knex): Promise<void> {
  await knex(TableName.USERS).where('email', adminCridentials.email).del();
  await knex(TableName.GROUPS).where('name', ADMIN_GROUP_NAME).del();
}

export { down, up };
