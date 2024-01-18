import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('receipts', (table) => {
    table.bigIncrements('id').primary();
    table.text('code').notNullable().unique();
    table.integer('owe');
    table.integer('have');
    table.integer('form').notNullable();
    table.integer('invoice_id').notNullable()
        .references('id')
        .inTable('invoices');
    table.integer('receiving_party_id').notNullable()
        .references('id')
        .inTable('companies');
    table.integer('delivering_party_id').notNullable()
        .references('id')
        .inTable('companies');
    table.integer('warehouses_id').notNullable()
        .references('id')
        .inTable('warehouses');
    table.text('creator_name').notNullable()
    table.text('deliver_name').notNullable()
    table.text('warehouseman_name').notNullable()
    table.text('accountant_name').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('receipts');
}
