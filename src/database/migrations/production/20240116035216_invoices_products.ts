import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('invoices_products', (table) => {
    table.bigIncrements('id').primary();
    table
      .bigInteger('invoice_id')
      .unsigned()
      .references('id')
      .inTable('invoices')
      .onDelete('CASCADE');
    table
      .bigInteger('product_id')
      .unsigned()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE');
    table.integer('cost').unsigned();
    table.integer('quantity_document').unsigned();
    table.integer('actual_quantity').unsigned();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('invoices_products');
}
