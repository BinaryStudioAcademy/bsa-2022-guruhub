import { Knex } from 'knex';

const TableName = {
  USERS_TO_GROUPS: 'users_to_groups',
  USERS: 'users',
} as const;

const ColumnName = {
  ID: 'id',
  PERMISSION_ID: 'permission_id',
  GROUP_ID: 'group_id',
} as const;

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.USERS, (table) => {
    table
      .integer(ColumnName.GROUP_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS_TO_GROUPS);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.USERS, (table) => {
    table.dropColumn(ColumnName.GROUP_ID);
  });
}
export { down, up };
