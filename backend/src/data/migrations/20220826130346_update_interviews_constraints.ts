import { Knex } from 'knex';

const TABLE_NAME = 'interviews';

const COLUMN_NAME = {
  CATEGORY_ID: 'category_id',
  INTERVIEWEE_USER_ID: 'interviewee_user_id',
} as const;

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.integer(COLUMN_NAME.CATEGORY_ID).notNullable().alter();
    table.integer(COLUMN_NAME.INTERVIEWEE_USER_ID).notNullable().alter();
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.setNullable(COLUMN_NAME.CATEGORY_ID);
    table.setNullable(COLUMN_NAME.INTERVIEWEE_USER_ID);
  });
}

export { down, up };
