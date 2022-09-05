import { Knex } from 'knex';

enum TableName {
  CHAT_MESSAGES = 'chat_messages',
}

enum ChatMessageStatus {
  READ = 'read',
  UNREAD = 'unread',
}

const ColumnName = {
  STATUS: 'status',
} as const;

async function up(knex: Knex): Promise<void> {
  await knex.schema.table(TableName.CHAT_MESSAGES, (table) => {
    table
      .enum(ColumnName.STATUS, Object.values(ChatMessageStatus))
      .defaultTo(ChatMessageStatus.UNREAD)
      .notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.table(TableName.CHAT_MESSAGES, (table) => {
    table.dropColumn(ColumnName.STATUS);
  });
}

export { down, up };
