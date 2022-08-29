import { Knex } from 'knex';

const TableName = {
  USER_DETAILS: 'user_details',
  USERS: 'users',
} as const;

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
} as const;

const onDeleteCascadeParam = 'CASCADE';

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
    table.dropForeign(ColumnName.USER_ID);
    table
      .integer(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS)
      .onDelete(onDeleteCascadeParam)
      .alter();
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
    table.dropForeign(ColumnName.USER_ID);
    table
      .integer(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS)
      .alter();
  });
}

export { down, up };
