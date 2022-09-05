import { Knex } from 'knex';

import { ChatMessageStatus } from '~/common/enums/enums';

enum TableName {
  CHAT_MESSAGES = 'chat_messages',
}

const ColumnName = {
  STATUS: 'status',
} as const;

async function up(knex: Knex): Promise<void> {
  await knex.schema.table(TableName.CHAT_MESSAGES, (table) => {
    table
      .enum(ColumnName.STATUS, [
        ChatMessageStatus.READ,
        ChatMessageStatus.UNREAD,
      ])
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
