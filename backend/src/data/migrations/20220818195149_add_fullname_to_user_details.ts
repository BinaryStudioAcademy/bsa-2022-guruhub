import { Knex } from 'knex';

const TableName = {
  USERS: 'users',
  USER_DETAILS: 'user_details',
} as const;

const ColumnName = 'full_name';

async function up(knex: Knex): Promise<void> {
  await knex.schema.table(TableName.USER_DETAILS, (table) => {
    table.string(ColumnName).notNullable();
  });
  await knex.schema.table(TableName.USERS, (table) => {
    table.dropColumn(ColumnName);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.table(TableName.USER_DETAILS, (table) => {
    table.dropColumn(ColumnName);
  });
  await knex.schema.table(TableName.USERS, (table) => {
    table.string(ColumnName).notNullable();
  });
}

export { down, up };
