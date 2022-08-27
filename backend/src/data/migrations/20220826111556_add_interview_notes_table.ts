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
  AUTHOR_ID = 'author_id',
  NOTE = 'note',
}

const DELETE_STRATEGY = 'CASCADE';

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
      .inTable(TableName.INTERVIEWS)
      .notNullable()
      .onDelete(DELETE_STRATEGY);
    table
      .integer(ColumnName.AUTHOR_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS)
      .notNullable()
      .notNullable()
      .onDelete(DELETE_STRATEGY);
    table.text(ColumnName.NOTE).notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TableName.INTERVIEW_NOTES);
}

export { down, up };
