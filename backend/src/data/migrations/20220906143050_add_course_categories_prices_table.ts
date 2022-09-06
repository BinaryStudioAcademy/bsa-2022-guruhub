import { Knex } from 'knex';

type IdContainer = {
  id: number;
};

enum TableName {
  COURSE_CATEGORIES_PRICES = 'course_categories_prices',
  COURSE_CATEGORIES = 'course_categories',
}

enum ColumnName {
  ID = 'id',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  CATEGORY_ID = 'category_id',
  PRICE = 'price',
}

const DELETE_STRATEGY = 'CASCADE';

const INITIAL_CATEGORY_PRICE = 5;
const CATEGORY_PRICE_INTIAL_DELTA = 0.99;

const getRandomPrice = (): number => {
  const countOfDecimalsAfterDot = 2;
  const isPriceValueChangePositive = Math.random() > 0.5;
  const priceChange = isPriceValueChangePositive
    ? CATEGORY_PRICE_INTIAL_DELTA
    : -CATEGORY_PRICE_INTIAL_DELTA;
  const newPrice = INITIAL_CATEGORY_PRICE + Math.random() * priceChange;

  return Number(newPrice.toFixed(countOfDecimalsAfterDot));
};

async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TableName.COURSE_CATEGORIES_PRICES, (table) => {
    table.increments(ColumnName.ID).primary();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .integer(ColumnName.CATEGORY_ID)
      .references(ColumnName.ID)
      .inTable(TableName.COURSE_CATEGORIES)
      .onDelete(DELETE_STRATEGY);
    table.float(ColumnName.PRICE).notNullable();
  });

  const categoriesIds: IdContainer[] = await knex(
    TableName.COURSE_CATEGORIES,
  ).select('course_categories.id');

  await Promise.all(
    categoriesIds.map((categoryIdConteiner) => {
      return knex(TableName.COURSE_CATEGORIES_PRICES).insert({
        categoryId: Number(categoryIdConteiner.id),
        price: getRandomPrice(),
      });
    }),
  );
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TableName.COURSE_CATEGORIES_PRICES);
}

export { down, up };
