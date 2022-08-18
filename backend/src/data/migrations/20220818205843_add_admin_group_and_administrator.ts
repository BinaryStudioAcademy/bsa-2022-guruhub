import { Knex } from 'knex';

import {
  GroupsCreateRequestDto,
  UserSignUpRequestDto,
} from '~/common/types/types';
import { auth, group } from '~/services/services';

const adminCridentials: UserSignUpRequestDto = {
  email: 'admin@guruhub.club',
  fullName: 'Admin',
  password: 'Pa55word',
};

const adminGroupName = 'Admins';

const TableName = {
  USERS: 'users',
  PERMISSIONS: 'permissions',
  USERS_TO_GROUPS: 'users_to_groups',
  GROUPS: 'groups',
  GROUPS_TO_PERMISSIONS: 'groups_to_permissions',
};

async function up(knex: Knex): Promise<void> {
  await auth.signUp(adminCridentials);

  const adminId = await knex(TableName.USERS)
    .select('id')
    .where('email', adminCridentials.email);

  const idToGivePermissions = adminId[0].id;

  if (adminId.length === 1 && idToGivePermissions) {
    const permissionIds = await knex(TableName.PERMISSIONS).select('id');
    const premissionIdsToGive = permissionIds.map(
      (permission) => permission.id,
    );

    const adminPermissionsDto: GroupsCreateRequestDto = {
      name: adminGroupName,
      permissionIds: premissionIdsToGive,
      userIds: [idToGivePermissions],
    };

    await group.create(adminPermissionsDto);
  }
}

async function down(knex: Knex): Promise<void> {
  await knex(TableName.USERS).where('email', adminCridentials.email).del();
  await knex(TableName.GROUPS).where('name', adminGroupName).del();
}

export { down, up };
