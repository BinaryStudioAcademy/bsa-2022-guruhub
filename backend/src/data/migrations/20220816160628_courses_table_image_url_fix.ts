import { Knex } from 'knex';

const TABLE_NAME = 'courses';

const COLUMN_NAME = 'image_url';

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.setNullable(COLUMN_NAME);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string(COLUMN_NAME).notNullable().alter();
  });
}

export { down, up };
