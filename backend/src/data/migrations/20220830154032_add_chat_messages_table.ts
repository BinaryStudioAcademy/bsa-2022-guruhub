import { Knex } from 'knex';

enum TableName {
  CHAT_MESSAGES = 'chat_messages',
  USERS = 'users',
}

enum ColumnName {
  ID = 'id',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  SENDER_ID = 'sender_id',
  RECEIVER_ID = 'receiver_id',
  MESSAGE = 'message',
}

const DELETE_STRATEGY = 'CASCADE';

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TableName.CHAT_MESSAGES, (table) => {
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
      .integer(ColumnName.SENDER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS)
      .notNullable()
      .onDelete(DELETE_STRATEGY);
    table
      .integer(ColumnName.RECEIVER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS)
      .notNullable()
      .onDelete(DELETE_STRATEGY);
    table.text(ColumnName.MESSAGE).notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  knex.schema.dropTableIfExists(TableName.CHAT_MESSAGES);
}

export { down, up };
