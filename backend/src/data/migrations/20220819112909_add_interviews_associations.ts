import { Knex } from 'knex';

const TableName = {
  INTERVIEWS: 'interviews',
  COURSE_CATEGORIES: 'course_categories',
  USERS: 'users',
};

const ColumnName = {
  ID: 'id',
  CATEGORY_ID: 'category_id',
  INTERVIEWEE_USER_ID: 'interviewee_user_id',
  INTERVIEWER_USER_ID: 'interviewer_user_id',
};

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.INTERVIEWS, (table) => {
    table
      .integer(ColumnName.CATEGORY_ID)
      .references(ColumnName.ID)
      .inTable(TableName.COURSE_CATEGORIES);
    table
      .integer(ColumnName.INTERVIEWEE_USER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS);
    table
      .integer(ColumnName.INTERVIEWER_USER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.INTERVIEWS, (table) => {
    table.dropColumn(ColumnName.CATEGORY_ID);
  });

  await knex.schema.alterTable(TableName.INTERVIEWS, (table) => {
    table.dropColumn(ColumnName.INTERVIEWEE_USER_ID);
  });

  await knex.schema.alterTable(TableName.INTERVIEWS, (table) => {
    table.dropColumn(ColumnName.INTERVIEWER_USER_ID);
  });
}

export { down, up };
