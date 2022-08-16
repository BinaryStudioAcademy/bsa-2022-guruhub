import { Knex } from 'knex';

const TableName = {
  GROUPS_TO_PERMISSIONS: 'groups_to_permissions',
  USERS_TO_GROUPS: 'users_to_groups',
  PERMISSIONS: 'permissions',
  GROUPS: 'groups',
  USERS: 'users',
} as const;

const ColumnName = {
  ID: 'id',
  PERMISSION_ID: 'permission_id',
  GROUP_ID: 'group_id',
  USER_ID: 'user_id',
} as const;

const onDeleteCascadeParam = 'CASCADE';

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.GROUPS_TO_PERMISSIONS, (table) => {
    table.dropForeign(ColumnName.GROUP_ID);
    table.dropForeign(ColumnName.PERMISSION_ID);
    table
      .integer(ColumnName.GROUP_ID)
      .references(ColumnName.ID)
      .inTable(TableName.GROUPS)
      .onDelete(onDeleteCascadeParam)
      .alter();
    table
      .integer(ColumnName.PERMISSION_ID)
      .references(ColumnName.ID)
      .inTable(TableName.PERMISSIONS)
      .onDelete(onDeleteCascadeParam)
      .alter();
    table.unique([ColumnName.GROUP_ID, ColumnName.PERMISSION_ID]);
  });

  await knex.schema.alterTable(TableName.USERS_TO_GROUPS, (table) => {
    table.dropForeign(ColumnName.GROUP_ID);
    table.dropForeign(ColumnName.USER_ID);
    table
      .integer(ColumnName.GROUP_ID)
      .references(ColumnName.ID)
      .inTable(TableName.GROUPS)
      .onDelete(onDeleteCascadeParam)
      .alter();
    table
      .integer(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS)
      .onDelete(onDeleteCascadeParam)
      .alter();
    table.unique([ColumnName.GROUP_ID, ColumnName.USER_ID]);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.GROUPS_TO_PERMISSIONS, (table) => {
    table.dropForeign(ColumnName.GROUP_ID);
    table.dropForeign(ColumnName.PERMISSION_ID);
    table
      .integer(ColumnName.GROUP_ID)
      .references(ColumnName.ID)
      .inTable(TableName.GROUPS)
      .alter();
    table
      .integer(ColumnName.PERMISSION_ID)
      .references(ColumnName.ID)
      .inTable(TableName.PERMISSIONS)
      .alter();
  });
  await knex.schema.alterTable(TableName.USERS_TO_GROUPS, (table) => {
    table.dropForeign(ColumnName.GROUP_ID);
    table.dropForeign(ColumnName.USER_ID);
    table
      .integer(ColumnName.GROUP_ID)
      .references(ColumnName.ID)
      .inTable(TableName.GROUPS)
      .alter();
    table
      .integer(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS)
      .alter();
  });
}

export { down, up };
