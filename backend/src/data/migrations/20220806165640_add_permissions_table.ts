import { Knex } from 'knex';

enum ColumnName {
  ID = 'id',
  NAME = 'name',
  KEY = 'key',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
}
const TABLE_NAME = 'permissions';

async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.NAME).unique().notNullable();
    table.string(ColumnName.KEY).unique().notNullable();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  await knex(TABLE_NAME).insert([{ name: 'Manage UAM', key: 'manage_uam' }]);
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
