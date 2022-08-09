import { Knex } from 'knex';

const TableName = {
  USERS_TO_GROUPS: 'users_to_groups',
  USERS: 'users',
  GROUPS: 'groups',
} as const;

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
  GROUP_ID: 'group_id',
} as const;

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.USERS_TO_GROUPS, (table) => {
    table
      .integer(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS);
    table
      .integer(ColumnName.GROUP_ID)
      .references(ColumnName.ID)
      .inTable(TableName.GROUPS);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.USERS_TO_GROUPS, (table) => {
    table.dropColumn(ColumnName.GROUP_ID);
    table.dropColumn(ColumnName.USER_ID);
  });
}

export { up, down };
