import { Knex } from 'knex';

const TableName = {
  USER_DETAILS: 'user_details',
  USERS: 'users',
} as const;

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
} as const;

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
    table
      .integer(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS)
      .unique()
      .notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.USERS, (table) => {
    table.dropColumn(ColumnName.USER_ID);
  });
}

export { down, up };
