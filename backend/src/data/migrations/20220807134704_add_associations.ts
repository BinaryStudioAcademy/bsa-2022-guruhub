import { Knex } from 'knex';

const TableName = {
  GROUPS_TO_PERMISSIONS: 'groups_to_permissions',
  PERMISSIONS: 'permissions',
  GROUPS: 'groups',
  USERS: 'users',
};

const ColumnName = {
  ID: 'id',
  PERMISSION_ID: 'permission_id',
  GROUP_ID: 'group_id',
};

const RelationRule = {
  CASCADE: 'CASCADE',
  SET_NULL: 'SET NULL',
};

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.GROUPS_TO_PERMISSIONS, (table) => {
    table
      .integer(ColumnName.PERMISSION_ID)
      .references(ColumnName.ID)
      .inTable(TableName.PERMISSIONS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
    table
      .integer(ColumnName.GROUP_ID)
      .references(ColumnName.ID)
      .inTable(TableName.GROUPS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
  });
  await knex.schema.alterTable(TableName.USERS, (table) => {
    table
      .integer(ColumnName.GROUP_ID)
      .references(ColumnName.ID)
      .inTable(TableName.GROUPS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName.GROUPS_TO_PERMISSIONS, (table) => {
    table.dropColumn(ColumnName.GROUP_ID);
    table.dropColumn(ColumnName.PERMISSION_ID);
  });
  await knex.schema.alterTable(TableName.USERS, (table) => {
    table.dropColumn(ColumnName.GROUP_ID);
  });
}

export { up, down };
