import { Knex } from 'knex';

const TableName = {
  GROUPS_TO_PERMISSIONS: 'groups_to_permissions',
  USERS_TO_GROUPS: 'users_to_groups',
  PERMISSIONS: 'permissions',
  GROUPS: 'groups',
  USERS: 'users',
} as const;

const ColumnName = {
  ID: 'id',
  PERMISSION_ID: 'permission_id',
  GROUP_ID: 'group_id',
  USER_ID: 'user_id',
} as const;

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.GROUPS_TO_PERMISSIONS, (table) => {
    table.unique([ColumnName.GROUP_ID, ColumnName.PERMISSION_ID]);
  });

  await knex.schema.alterTable(TableName.USERS_TO_GROUPS, (table) => {
    table.unique([ColumnName.GROUP_ID, ColumnName.USER_ID]);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.GROUPS_TO_PERMISSIONS, (table) => {
    table.dropUnique([ColumnName.GROUP_ID, ColumnName.PERMISSION_ID]);
  });
  await knex.schema.alterTable(TableName.USERS_TO_GROUPS, (table) => {
    table.dropUnique([ColumnName.GROUP_ID, ColumnName.USER_ID]);
  });
}

export { down, up };
