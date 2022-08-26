import { Knex } from 'knex';

const TableName = {
  COURSES_TO_MENTORS: 'courses_to_mentors',
  USERS: 'users',
  COURSES: 'courses',
} as const;

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
  COURSE_ID: 'course_id',
} as const;

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.COURSES_TO_MENTORS, (table) => {
    table
      .integer(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS);
    table
      .integer(ColumnName.COURSE_ID)
      .references(ColumnName.ID)
      .inTable(TableName.COURSES);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.COURSES_TO_MENTORS, (table) => {
    table.dropColumn(ColumnName.COURSE_ID);
    table.dropColumn(ColumnName.USER_ID);
  });
}

export { down, up };
