import { Knex } from 'knex';

const TABLE_NAME = 'vendors';

const edxData = { name: 'EDX', key: 'edx' };

async function up(knex: Knex): Promise<void> {
  await knex(TABLE_NAME).insert(edxData);
}

async function down(knex: Knex): Promise<void> {
  return knex(TABLE_NAME).where('key', edxData.key).del();
}

export { down, up };
