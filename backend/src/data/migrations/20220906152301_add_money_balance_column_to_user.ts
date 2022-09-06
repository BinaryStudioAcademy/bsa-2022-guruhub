import { Knex } from 'knex';

enum TableName {
  USER_DETAILS = 'user_details',
}

enum ColumnName {
  MONEY_BALANCE = 'money_balance',
}

const DEFAULT_USER_MONEY_BALANCE = 0;

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
    table
      .float(ColumnName.MONEY_BALANCE)
      .notNullable()
      .defaultTo(DEFAULT_USER_MONEY_BALANCE);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
    table.dropColumn(ColumnName.MONEY_BALANCE);
  });
}

export { down, up };
