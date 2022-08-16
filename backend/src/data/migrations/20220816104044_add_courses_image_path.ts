import { Knex } from 'knex';

const TABLE_NAME = 'courses';

const COLUMN_NAME = 'image_url';

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string(COLUMN_NAME).notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}

export { down, up };
