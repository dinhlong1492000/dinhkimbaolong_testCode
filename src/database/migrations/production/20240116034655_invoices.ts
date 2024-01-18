import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('invoices', (table) => {
    table.bigIncrements('id').primary();
    table.integer('cost').notNullable();
    table.integer('biller_id').notNullable()
        .references('id')
        .inTable('users');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('invoices');
}
