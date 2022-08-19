import { Knex } from 'knex';

const TABLE_NAME = 'course_categories';

async function up(knex: Knex): Promise<void> {
  await knex(TABLE_NAME).update('key', 'c-sharp').where('key', 'c#');
}

async function down(knex: Knex): Promise<void> {
  await knex(TABLE_NAME).update('key', 'c#').where('key', 'c-sharp');
}

export { down, up };
