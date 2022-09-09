import { Knex } from 'knex';

const TABLE_NAME = 'mentees_to_mentors';

const COLUMN_NAME = 'status';

enum Status {
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
}

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table
      .enum(COLUMN_NAME, Object.values(Status))
      .defaultTo(Status.IN_PROGRESS);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}

export { down, up };
