import { Knex } from 'knex';

enum ColumnName {
  ID = 'id',
  URL = 'url',
  CONTENT_TYPE = 'content_type',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
}
const TABLE_NAME = 'files';

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.URL).unique().notNullable();
    table.string(ColumnName.CONTENT_TYPE).notNullable();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
