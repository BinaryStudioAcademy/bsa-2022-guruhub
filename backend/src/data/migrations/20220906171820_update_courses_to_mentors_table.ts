import { Knex } from 'knex';

const COLUMN_NAME = 'students_count';

const TABLE_NAME = 'courses_to_mentors';

async function up(knex: Knex): Promise<void> {
  await knex.schema.table(TABLE_NAME, (table) => {
    table.integer(COLUMN_NAME).defaultTo(1).notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}

export { down, up };
