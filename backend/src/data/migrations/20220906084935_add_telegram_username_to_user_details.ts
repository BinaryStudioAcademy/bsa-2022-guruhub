import { Knex } from 'knex';

enum TableName {
  USER_DETAILS = 'user_details',
}

const ColumnName = {
  TELEGRAM_USERNAME: 'telegram_username',
} as const;

async function up(knex: Knex): Promise<void> {
  await knex.schema.table(TableName.USER_DETAILS, (table) => {
    table.string(ColumnName.TELEGRAM_USERNAME);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.table(TableName.USER_DETAILS, (table) => {
    table.dropColumn(ColumnName.TELEGRAM_USERNAME);
  });
}

export { down, up };
