import { Knex } from 'knex';

enum ColumnName {
  ID = 'id',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  INTERVIEW_DATE = 'interview_date',
  STATUS = 'status',
}

const TABLE_NAME = 'interviews';

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
    table.dateTime(ColumnName.INTERVIEW_DATE).notNullable();
    table.string(ColumnName.STATUS).notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
