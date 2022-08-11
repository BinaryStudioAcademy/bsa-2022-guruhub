import { Knex } from 'knex';

enum TableName {
  COURSES = 'courses',
  VENDORS = 'vendors',
  COURSES_TO_VENDORS = 'courses_to_vendors',
}

enum ColumnName {
  ID = 'id',
  VENDOR_ID = 'vendor_id',
  COURSE_ID = 'course_id',
}

async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TableName.COURSES, (table) => {
    table
      .integer(ColumnName.VENDOR_ID)
      .references(ColumnName.ID)
      .inTable(TableName.VENDORS);
    table
      .integer(ColumnName.COURSE_ID)
      .references(ColumnName.ID)
      .inTable(TableName.COURSES);
  });
}

async function down(knex: Knex): Promise<void> {
  knex.schema.alterTable(TableName.COURSES_TO_VENDORS, (table) => {
    table.dropColumn(ColumnName.VENDOR_ID);
    table.dropColumn(ColumnName.COURSE_ID);
  });
}

export { down, up };
