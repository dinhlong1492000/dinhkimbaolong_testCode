import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.text("email").unique();
    table.text("username").unique();
    table.text("password");
    table.text("phone");
    table.text("address");
    table.text('avatar_url');
    table.integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .defaultTo(null);
    table.boolean('deliver').defaultTo(false)
    table.timestamp('date_of_birth');
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users')
}