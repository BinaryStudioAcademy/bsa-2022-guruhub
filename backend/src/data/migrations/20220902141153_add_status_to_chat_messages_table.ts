import { Knex } from 'knex';

enum TableName {
  CHAT_MESSAGES = 'chat_messages',
}

const ColumnName = {
  STATUS: 'status',
} as const;

async function up(knex: Knex): Promise<void> {
  await knex.schema.table(TableName.CHAT_MESSAGES, (table) => {
    table.string(ColumnName.STATUS).notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.table(TableName.CHAT_MESSAGES, (table) => {
    table.dropColumn(ColumnName.STATUS);
  });
}

export { down, up };
