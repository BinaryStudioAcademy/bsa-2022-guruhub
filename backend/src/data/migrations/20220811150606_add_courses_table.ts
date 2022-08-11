import { Knex } from 'knex';

enum ColumnName {
  ID = 'id',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  TITLE = 'title',
  DESCRIPTION = 'description',
  URL = 'url',
  VENDOR_ID = 'vendor_id',
  COURSE_CATEGORY_ID = 'course_category_id',
}

enum RelatedTablesNames {
  VENDORS = 'vendors',
  COURSE_CATEGORIES = 'course_categories',
}

const TABLE_NAME = 'courses';

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
    table.string(ColumnName.TITLE).notNullable();
    table.string(ColumnName.DESCRIPTION).notNullable();
    table.string(ColumnName.URL).notNullable();
    table
      .integer(ColumnName.VENDOR_ID)
      .references(ColumnName.ID)
      .inTable(RelatedTablesNames.VENDORS);
    table
      .integer(ColumnName.COURSE_CATEGORY_ID)
      .references(ColumnName.ID)
      .inTable(RelatedTablesNames.COURSE_CATEGORIES);
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
