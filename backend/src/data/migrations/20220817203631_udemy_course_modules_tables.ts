import { Knex } from 'knex';

enum ColumnName {
  ID = 'id',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  TITLE = 'title',
  DESCRIPTION = 'description',
  SORTED_ORDER = 'sort_order',
  PASS_PERCENT = 'pass_percent',
  ASSET_TYPE = 'asset_type',
  ASSET_ID = 'asset_id',
  COURSE_ID = 'course_id',
}

enum TableName {
  COURSES = 'courses',
  COURSES_LECTURE_MODULES = 'courses_lecture_modules',
  COURSES_LECTURE_MODULES_ASSETS = 'courses_lecture_modules_assets',
  COURSES_CHAPTER_MODULES = 'courses_chapter_modules',
  COURSES_PRACTICE_MODULES = 'courses_practice_modules',
  COURSES_QUIZ_MODULES = 'courses_quiz_modules',
}

async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(
    TableName.COURSES_LECTURE_MODULES_ASSETS,
    (table) => {
      table.increments(ColumnName.ID).primary();
      table
        .dateTime(ColumnName.CREATED_AT)
        .notNullable()
        .defaultTo(knex.fn.now());
      table
        .dateTime(ColumnName.UPDATED_AT)
        .notNullable()
        .defaultTo(knex.fn.now());
      table.string(ColumnName.TITLE).notNullable();
      table.string(ColumnName.ASSET_TYPE).notNullable();
    },
  );

  await knex.schema.createTable(TableName.COURSES_LECTURE_MODULES, (table) => {
    table.increments(ColumnName.ID).primary();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table.string(ColumnName.TITLE).notNullable();
    table.string(ColumnName.DESCRIPTION).notNullable();
    table.integer(ColumnName.SORTED_ORDER).notNullable();
    table
      .integer(ColumnName.ASSET_ID)
      .references(ColumnName.ID)
      .inTable(TableName.COURSES_LECTURE_MODULES_ASSETS);
    table
      .integer(ColumnName.COURSE_ID)
      .references(ColumnName.ID)
      .inTable(TableName.COURSES);
  });

  await knex.schema.createTable(TableName.COURSES_CHAPTER_MODULES, (table) => {
    table.increments(ColumnName.ID).primary();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table.string(ColumnName.TITLE).notNullable();
    table.string(ColumnName.DESCRIPTION).notNullable();
    table.integer(ColumnName.SORTED_ORDER).notNullable();
    table
      .integer(ColumnName.COURSE_ID)
      .references(ColumnName.ID)
      .inTable(TableName.COURSES);
  });

  await knex.schema.createTable(TableName.COURSES_PRACTICE_MODULES, (table) => {
    table.increments(ColumnName.ID).primary();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table.string(ColumnName.TITLE).notNullable();
    table.integer(ColumnName.SORTED_ORDER).notNullable();
    table
      .integer(ColumnName.COURSE_ID)
      .references(ColumnName.ID)
      .inTable(TableName.COURSES);
  });

  await knex.schema.createTable(TableName.COURSES_QUIZ_MODULES, (table) => {
    table.increments(ColumnName.ID).primary();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table.string(ColumnName.TITLE).notNullable();
    table.string(ColumnName.DESCRIPTION).notNullable();
    table.integer(ColumnName.SORTED_ORDER).notNullable();
    table.integer(ColumnName.PASS_PERCENT).notNullable();
    table
      .integer(ColumnName.COURSE_ID)
      .references(ColumnName.ID)
      .inTable(TableName.COURSES);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TableName.COURSES_LECTURE_MODULES_ASSETS);
  await knex.schema.dropTable(TableName.COURSES_LECTURE_MODULES);
  await knex.schema.dropTable(TableName.COURSES_CHAPTER_MODULES);
  await knex.schema.dropTable(TableName.COURSES_PRACTICE_MODULES);
  await knex.schema.dropTable(TableName.COURSES_QUIZ_MODULES);
}

export { down, up };
