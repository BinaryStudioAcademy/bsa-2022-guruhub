import { Knex } from 'knex';

const TABLE_NAME = 'courses';

const COLUMN_NAME = 'description';

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.text(COLUMN_NAME).notNullable().alter();
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string(COLUMN_NAME).notNullable().alter();
  });
}

export { down, up };
