import { Knex } from 'knex';

enum ColumnName {
  FULL_NAME = 'full_name',
}

async function up(knex: Knex): Promise<void> {
  return knex.schema.table('users', (table) => {
    table.string(ColumnName.FULL_NAME).notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}

export { up, down };
