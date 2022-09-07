import { Knex } from 'knex';

const ColumnName = 'max_students_count';

const TableName = 'courses_to_mentors';

async function up(knex: Knex): Promise<void> {
  await knex.schema.table(TableName, (table) => {
    table.integer(ColumnName).defaultTo(1).notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TableName, (table) => {
    table.dropColumn(ColumnName);
  });
}

export { down, up };
