import { Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
  return knex.schema.table('users', (table) => {
    table.string('fullName').notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}

export { up, down };
