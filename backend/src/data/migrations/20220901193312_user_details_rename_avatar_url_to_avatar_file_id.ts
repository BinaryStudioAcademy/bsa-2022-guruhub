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
    table
      .integer(ColumnName.AVATAR_URL)
      .references(ColumnName.ID)
      .inTable(TableName.FILES)
      .alter();
    table.renameColumn(ColumnName.AVATAR_URL, ColumnName.AVATAR_FILE_ID);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
    table.string(ColumnName.AVATAR_FILE_ID).alter();
    table.renameColumn(ColumnName.AVATAR_FILE_ID, ColumnName.AVATAR_URL);
  });
}

export { down, up };
