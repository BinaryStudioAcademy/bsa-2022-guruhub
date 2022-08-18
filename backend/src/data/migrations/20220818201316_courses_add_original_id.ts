import { Knex } from 'knex';

enum ColumnName {
  ORIGINAL_ID = 'original_id',
}

const TABLE_NAME = 'courses';

async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.string(ColumnName.ORIGINAL_ID).nullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.ORIGINAL_ID);
  });
}

export { down, up };
