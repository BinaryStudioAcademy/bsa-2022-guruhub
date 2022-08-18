import { Knex } from 'knex';

enum ColumnName {
  ID = 'id',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  COURSE_ID = 'course_id',
  MODULE_INDEX = 'module_index',
  TITLE = 'title',
  DESCRIPTION = 'description',
}

enum TableName {
  COURSES = 'courses',
}

const TABLE_NAME = 'course_modules';

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .integer(ColumnName.COURSE_ID)
      .references(ColumnName.ID)
      .inTable(TableName.COURSES);
    table.integer(ColumnName.MODULE_INDEX).notNullable();
    table.string(ColumnName.TITLE).notNullable();
    table.text(ColumnName.DESCRIPTION).nullable();
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE_NAME);
}

export { down, up };
