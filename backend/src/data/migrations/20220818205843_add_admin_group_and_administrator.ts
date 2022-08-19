import { genSalt, hash } from 'bcrypt';
import { Knex } from 'knex';

const adminCridentials = {
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

  const insertedAdmins = await knex(TableName.USERS)
    .insert({
      email,
      fullName,
      passwordSalt,
      passwordHash,
    })
    .returning('*');

  const [insertedAdmin] = insertedAdmins;
  const { id: adminId } = insertedAdmin;

  const hasAdminId = Boolean(adminId);

  if (!hasAdminId) {
    return;
  }

  const permissionIds = await knex(TableName.PERMISSIONS).select('id');
  const premissionIdsToGive = permissionIds.map((permission) => permission.id);

  const adminPermissionsDto = {
    name: ADMIN_GROUP_NAME,
    permissionIds: premissionIdsToGive,
    userIds: [adminId],
  };

  const insertedAdminGroups = await knex(TableName.GROUPS)
    .insert({
      name: ADMIN_GROUP_NAME,
      key: ADMIN_GROUP_NAME.toLowerCase(),
    })
    .returning('*');

  const [insertedAdminGroup] = insertedAdminGroups;
  const { id: groupId } = insertedAdminGroup;

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

async function down(knex: Knex): Promise<void> {
  await knex(TableName.USERS).where('email', adminCridentials.email).del();
  await knex(TableName.GROUPS).where('name', ADMIN_GROUP_NAME).del();
}

export { down, up };
