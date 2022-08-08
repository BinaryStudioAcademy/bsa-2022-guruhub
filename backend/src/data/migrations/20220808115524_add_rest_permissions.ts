import { Knex } from 'knex';

const TABLE_NAME = 'permissions';

const permissions = [
  { name: 'Manage Interviews', key: 'manage_interviews' },
  { name: 'Manage Categories', key: 'manage_categories' },
  { name: 'Manage Mentoring', key: 'manage_mentoring' },
];

async function up(knex: Knex): Promise<void> {
  await knex(TABLE_NAME).insert(permissions);
}

async function down(knex: Knex): Promise<void> {
  await knex(TABLE_NAME)
    .whereIn(
      'name',
      permissions.map((permission) => permission.name),
    )
    .del();
}

export { up, down };
