import { Knex } from 'knex';

enum TableName {
  USER_DETAILS = 'user_details',
  FILES = 'files',
}

enum ColumnName {
  AVATAR_URL = 'avatar_url',
  AVATAR_FILE_ID = 'avatar_file_id',
  ID = 'id',
}

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
    table.dropColumn(ColumnName.AVATAR_URL);
    table
      .integer(ColumnName.AVATAR_FILE_ID)
      .references(ColumnName.ID)
      .inTable(TableName.FILES);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
    table.dropColumn(ColumnName.AVATAR_FILE_ID);
    table.string(ColumnName.AVATAR_URL);
  });
}

export { down, up };
