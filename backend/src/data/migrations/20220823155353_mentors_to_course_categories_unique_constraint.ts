import { Knex } from 'knex';

const TABLE_NAME = 'mentors_to_course_categories';

const ColumnName = {
  COURSE_CATEGORY_ID: 'course_category_id',
  USER_ID: 'user_id',
} as const;

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.unique([ColumnName.USER_ID, ColumnName.COURSE_CATEGORY_ID]);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropUnique([ColumnName.USER_ID, ColumnName.COURSE_CATEGORY_ID]);
  });
}

export { down, up };
