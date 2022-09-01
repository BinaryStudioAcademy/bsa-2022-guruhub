import { Knex } from 'knex';

enum TableName {
  TASKS = 'tasks',
  TASK_NOTES = 'task_notes',
  USERS = 'users',
}

enum ColumnName {
  ID = 'id',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  TASK_ID = 'task_id',
  AUTHOR_ID = 'author_id',
  NOTE = 'note',
  STATUS = 'status',
}

const DELETE_STRATEGY = 'CASCADE';

const STATUS_VALUES = ['Uncompleted', 'Pending', 'Rejected', 'Completed'];

const STATUS_UNCOMPLETED = 'Uncompleted';

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TableName.TASK_NOTES, (table) => {
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
      .integer(ColumnName.AUTHOR_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS)
      .notNullable()
      .onDelete(DELETE_STRATEGY);
    table
      .integer(ColumnName.TASK_ID)
      .references(ColumnName.ID)
      .inTable(TableName.TASKS)
      .notNullable()
      .onDelete(DELETE_STRATEGY);
    table.text(ColumnName.NOTE).notNullable();
    table
      .enum(ColumnName.STATUS, STATUS_VALUES)
      .notNullable()
      .defaultTo(STATUS_UNCOMPLETED);
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TableName.TASK_NOTES);
}

export { down, up };
