import { Knex } from 'knex';

const TABLE_NAME = 'user_details';

const COLUMN_NAME = {
  FIRST_NAME: 'first_name',
  LAST_NAME: 'last_name',
  GENDER: 'gender',
} as const;

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.setNullable(COLUMN_NAME.GENDER);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string(COLUMN_NAME.GENDER).notNullable().alter();
  });
}

export { down, up };
