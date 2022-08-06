import { Knex } from 'knex';

const TABLE_NAME = 'permissions';

export async function seed(knex: Knex): Promise<void> {
  await knex(TABLE_NAME).del();

  await knex(TABLE_NAME).insert([{ id: 1, name: 'Manage UAM', key: 'manage_uam' }]);
}
