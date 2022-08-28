import { Knex } from 'knex';

const TABLE_NAME = 'courses_to_mentors';

const ColumnName = {
  USER_ID: 'user_id',
  COURSE_ID: 'course_id',
} as const;

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.unique([ColumnName.USER_ID, ColumnName.COURSE_ID]);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropUnique([ColumnName.USER_ID, ColumnName.COURSE_ID]);
  });
}

export { down, up };
