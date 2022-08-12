import { Knex } from 'knex';

enum ColumnName {
  ID = 'id',
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  GENDER = 'gender',
  AVATAR_URL = 'avatar_url',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  DATE_OF_BIRTH = 'date_of_birth',
}
const TABLE_NAME = 'user_details';

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.FIRST_NAME).notNullable();
    table.string(ColumnName.LAST_NAME).notNullable();
    table.string(ColumnName.GENDER).notNullable();
    table.string(ColumnName.AVATAR_URL).notNullable();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table.date(ColumnName.DATE_OF_BIRTH).notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
