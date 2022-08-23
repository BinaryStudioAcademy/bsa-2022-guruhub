import { Knex } from 'knex';

const TableName = {
  MENTORS_TO_COURSE_CATEGORIES: 'mentors_to_course_categories',
  USERS: 'users',
  COURSE_CATEGORIES: 'course_categories',
} as const;

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
  COURSE_CATEGORY_ID: 'course_category_id',
} as const;

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(
    TableName.MENTORS_TO_COURSE_CATEGORIES,
    (table) => {
      table
        .integer(ColumnName.USER_ID)
        .references(ColumnName.ID)
        .inTable(TableName.USERS);
      table
        .integer(ColumnName.COURSE_CATEGORY_ID)
        .references(ColumnName.ID)
        .inTable(TableName.COURSE_CATEGORIES);
    },
  );
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(
    TableName.MENTORS_TO_COURSE_CATEGORIES,
    (table) => {
      table.dropColumn(ColumnName.COURSE_CATEGORY_ID);
      table.dropColumn(ColumnName.USER_ID);
    },
  );
}

export { down, up };
