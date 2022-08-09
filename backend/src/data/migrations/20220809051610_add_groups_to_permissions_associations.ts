import { Knex } from 'knex';

const TableName = {
  GROUPS_TO_PERMISSIONS: 'groups_to_permissions',
  PERMISSIONS: 'permissions',
  GROUPS: 'groups',
  USERS: 'users',
} as const;

const ColumnName = {
  ID: 'id',
  PERMISSION_ID: 'permission_id',
  GROUP_ID: 'group_id',
} as const;

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.GROUPS_TO_PERMISSIONS, (table) => {
    table
      .integer(ColumnName.PERMISSION_ID)
      .references(ColumnName.ID)
      .inTable(TableName.PERMISSIONS);
    table
      .integer(ColumnName.GROUP_ID)
      .references(ColumnName.ID)
      .inTable(TableName.GROUPS);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.GROUPS_TO_PERMISSIONS, (table) => {
    table.dropColumn(ColumnName.GROUP_ID);
    table.dropColumn(ColumnName.PERMISSION_ID);
  });
}

export { up, down };
