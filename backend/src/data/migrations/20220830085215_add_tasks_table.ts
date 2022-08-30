import { Knex } from 'knex';

enum TableName {
  TASKS = 'tasks',
  MENTEES_TO_MENTORS = 'mentees_to_mentors',
  COURSE_MODULES = 'course_modules',
}

enum ColumnName {
  ID = 'id',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  MENTEES_TO_MENTORS_ID = 'mentees_to_mentors_id',
  MODULE_ID = 'module_id',
  STATUS = 'status',
}

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TableName.TASKS, (table) => {
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
      .integer(ColumnName.MENTEES_TO_MENTORS_ID)
      .references(ColumnName.ID)
      .inTable(TableName.MENTEES_TO_MENTORS)
      .notNullable();
    table
      .integer(ColumnName.MODULE_ID)
      .references(ColumnName.ID)
      .inTable(TableName.COURSE_MODULES)
      .notNullable();
    table.string(ColumnName.STATUS).notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TableName.TASKS);
}

export { down, up };
