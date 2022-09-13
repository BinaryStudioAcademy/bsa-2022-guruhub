import { Knex } from 'knex';

const MENTORS_GROUP_NAME = 'Mentors';

const TableName = {
  PERMISSIONS: 'permissions',
  GROUPS: 'groups',
  GROUPS_TO_PERMISSIONS: 'groups_to_permissions',
};

const MENTOR_PERMISSION_KEY = 'manage_mentoring';

async function up(knex: Knex): Promise<void> {
  const permissionsData = await knex(TableName.PERMISSIONS).select('id', 'key');
  const [permissionId] = permissionsData
    .filter((permission) => permission.key === MENTOR_PERMISSION_KEY)
    .map((permission) => permission.id);

  const insertedMentorGroups = await knex(TableName.GROUPS)
    .insert({
      name: MENTORS_GROUP_NAME,
      key: MENTORS_GROUP_NAME.toLowerCase(),
    })
    .returning('*');

  const [mentorGroup] = insertedMentorGroups;
  const { id: groupId } = mentorGroup;

  await knex(TableName.GROUPS_TO_PERMISSIONS).insert({
    groupId,
    permissionId,
  });
}

async function down(knex: Knex): Promise<void> {
  await knex(TableName.GROUPS).where('name', MENTORS_GROUP_NAME).del();
}

export { down, up };
