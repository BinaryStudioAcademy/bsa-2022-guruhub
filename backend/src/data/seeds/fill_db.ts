import { vendorsSeed } from '../seed-data/vendors-seed';
import { Knex } from 'knex';

const TableName = {
  VENDORS: 'vendors',
};

export async function seed(knex: Knex): Promise<void> {
  await knex(TableName.VENDORS).del();
  await knex(TableName.VENDORS).insert(vendorsSeed);
}
