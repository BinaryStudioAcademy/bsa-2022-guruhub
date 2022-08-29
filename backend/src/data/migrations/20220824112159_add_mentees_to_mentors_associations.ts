import { Knex } from 'knex';

const TableName = {
  MENTEES_TO_MENTORS: 'mentees_to_mentors',
  USERS: 'users',
  COURSES: 'courses',
};

const ColumnName = {
  ID: 'id',
  COURSE_ID: 'course_id',
  MENTOR_ID: 'mentor_id',
  MENTEE_ID: 'mentee_id',
};

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.MENTEES_TO_MENTORS, (table) => {
    table
      .integer(ColumnName.COURSE_ID)
      .references(ColumnName.ID)
      .inTable(TableName.COURSES);
    table
      .integer(ColumnName.MENTOR_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS);
    table
      .integer(ColumnName.MENTEE_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.MENTEES_TO_MENTORS, (table) => {
    table.dropColumns(
      ColumnName.COURSE_ID,
      ColumnName.MENTOR_ID,
      ColumnName.MENTEE_ID,
    );
  });
}

export { down, up };
