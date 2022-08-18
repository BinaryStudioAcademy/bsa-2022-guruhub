import { Knex } from 'knex';

const adminDbCridentials = {
  email: 'admin@guruhub.club',
  fullName: 'Admin',
  passwordSalt: '$2b$10$Dq7FKk/k/nhhPwodL6V3G.',
  passwordHash: '$2b$10$Dq7FKk/k/nhhPwodL6V3G.DRTSUnsCMTKocaCTGvU4rl9WYP.8g3e',
};

const TableName = {
  USERS: 'users',
};

async function up(knex: Knex): Promise<void> {
  await knex(TableName.USERS).insert(adminDbCridentials);

  const adminId = await knex(TableName.USERS)
    .select('id')
    .where('email', adminDbCridentials.email);
  JSON.stringify(adminId);
}

async function down(knex: Knex): Promise<void> {
  await knex(TableName.USERS).where('email', adminDbCridentials.email).del();
}

export { down, up };
