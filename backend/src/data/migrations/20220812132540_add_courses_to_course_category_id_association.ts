import { Knex } from 'knex';

enum TableName {
  COURSES = 'courses',
  COURSE_CATEGORIES = 'course_categories',
  COURSES_TO_COURSE_CATEGORIES = 'courses_to_course_categories',
}

enum ColumnName {
  ID = 'id',
  COURSE_ID = 'course_id',
  COURSE_CATEGORY_ID = 'course_category_id',
}

async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    TableName.COURSES_TO_COURSE_CATEGORIES,
    (table) => {
      table
        .integer(ColumnName.COURSE_ID)
        .references(ColumnName.ID)
        .inTable(TableName.COURSES);
      table
        .integer(ColumnName.COURSE_CATEGORY_ID)
        .references(ColumnName.ID)
        .inTable(TableName.COURSE_CATEGORIES);
    },
  );
}

async function down(knex: Knex): Promise<void> {
  knex.schema.alterTable(TableName.COURSES_TO_COURSE_CATEGORIES, (table) => {
    table.dropColumn(ColumnName.COURSE_ID);
    table.dropColumn(ColumnName.COURSE_CATEGORY_ID);
  });
}

export { down, up };
