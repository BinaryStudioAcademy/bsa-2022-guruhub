import { Knex } from 'knex';

enum ColumnName {
	ID = 'id',
	CREATED_AT = 'created_at',
	UPDATED_AT = 'updated_at',
	EMAIL = 'email'
}
const TABLE_NAME = 'users';

async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table.string(ColumnName.EMAIL).unique().notNullable();
		table.dateTime(ColumnName.CREATED_AT).notNullable().defaultTo(knex.fn.now());
		table.dateTime(ColumnName.UPDATED_AT).notNullable().defaultTo(knex.fn.now());
	});
}

async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
