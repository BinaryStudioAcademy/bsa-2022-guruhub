import { Knex } from 'knex';
import { vendorsSeed } from '../seed-data/vendors-seed';

enum ColumnName {
  ID = 'id',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  NAME = 'name',
  KEY = 'key',
}
const TABLE_NAME = 'vendors';

async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.NAME).unique().notNullable();
    table.text(ColumnName.KEY).unique().notNullable();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });
  await knex(TABLE_NAME).insert(vendorsSeed);
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
