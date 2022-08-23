import { Knex } from 'knex';

enum ColumnName {
  FULL_NAME = 'full_name',
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
}

enum TableName {
  USERS = 'users',
  USER_DETAILS = 'user_details',
}

async function up(knex: Knex): Promise<void> {
  await knex.schema.table(TableName.USER_DETAILS, (table) => {
    table.dropColumn(ColumnName.FIRST_NAME);
    table.dropColumn(ColumnName.LAST_NAME);
    table.string(ColumnName.FULL_NAME).notNullable();
  });

  await knex.raw(
    'INSERT INTO user_details (user_id, full_name) ' +
      '(SELECT id AS user_id, full_name ' +
      'FROM users)',
  );

  await knex.schema.table(TableName.USERS, (table) => {
    table.dropColumn(ColumnName.FULL_NAME);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.table(TableName.USER_DETAILS, (table) => {
    table.string(ColumnName.FIRST_NAME).notNullable();
    table.string(ColumnName.LAST_NAME).notNullable();
  });

  await knex.schema.table(TableName.USERS, (table) => {
    table.string(ColumnName.FULL_NAME).notNullable();
  });

  await knex.raw(
    'UPDATE users SET full_name = (SELECT full_name FROM user_details WHERE users.id = user_details.user_id)',
  );

  await knex.schema.table(TableName.USER_DETAILS, (table) => {
    table.dropColumn(ColumnName.FULL_NAME);
  });
}

export { down, up };
