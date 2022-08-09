import { Knex } from 'knex';

enum ColumnName {
  FULL_NAME = 'full_name',
}

const TABLE_NAME = 'users';

async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.string(ColumnName.FULL_NAME).notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.FULL_NAME);
  });
}

export { down, up };
