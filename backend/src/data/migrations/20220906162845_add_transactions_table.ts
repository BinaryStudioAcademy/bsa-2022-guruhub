import { Knex } from 'knex';

enum TableName {
  TRANSACTIONS = 'transactions',
  USERS = 'users',
}

enum ColumnName {
  ID = 'id',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  SENDER_ID = 'sender_id',
  RECEIVER_ID = 'receiver_id',
  AMOUNT = 'amount',
  STATUS = 'status',
}

enum TransactionStatus {
  PENDING = 'pending',
  HOLD = 'hold',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

const DELETE_STRATEGY = 'CASCADE';

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TableName.TRANSACTIONS, (table) => {
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
    table.float(ColumnName.AMOUNT).notNullable();
    table.enum(ColumnName.STATUS, Object.values(TransactionStatus));
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TableName.TRANSACTIONS);
}

export { down, up };
