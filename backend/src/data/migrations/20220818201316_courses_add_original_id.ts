import { Knex } from 'knex';

enum ColumnName {
  ORIGINAL_ID = 'original_id',
  VENDOR_ID = 'vendor_id',
}

const TABLE_NAME = 'courses';

async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.string(ColumnName.ORIGINAL_ID).nullable();
    table.unique([ColumnName.ORIGINAL_ID, ColumnName.VENDOR_ID]);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.table(TABLE_NAME, (table) => {
    table.dropUnique([ColumnName.ORIGINAL_ID, ColumnName.VENDOR_ID]);
    table.dropColumn(ColumnName.ORIGINAL_ID);
  });
}

export { down, up };
