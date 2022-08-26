import { Knex } from 'knex';

enum TableName {
  INTERVIEW_NOTES = 'interview_notes',
  INTERVIEWS = 'interviews',
  USERS = 'users',
}

enum ColumnName {
  ID = 'id',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  INTERVIEW_ID = 'interview_id',
  CREATED_BY_USER_ID = 'created_by_user_id',
  NOTE = 'note',
}

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TableName.INTERVIEW_NOTES, (table) => {
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
      .integer(ColumnName.INTERVIEW_ID)
      .references(ColumnName.ID)
      .inTable(TableName.INTERVIEWS);
    table
      .integer(ColumnName.CREATED_BY_USER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS);
    table.text(ColumnName.NOTE).notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TableName.INTERVIEW_NOTES);
}

export { down, up };
