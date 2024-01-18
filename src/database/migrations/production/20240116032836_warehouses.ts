import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("warehouses", (table) => {
    table.bigIncrements("id").primary();
    table.text("name").unique();
    table.text("description");
    table.text("address");
    table.integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .defaultTo(null);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("warehouses");
}
