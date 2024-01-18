import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // User
    await knex("users_roles").del();
    await knex("invoices_products").del();
    await knex("receipts").del();
    await knex("invoices").del();
    await knex("warehouses").del();
    await knex("products").del();
    await knex("roles").del();
    await knex("users").del();
    await knex("companies").del();

    await knex("users").insert([
        { id: 1, email: "email1", username: "name1", password: "ps1", phone: "312321", address: "address1", deliver: false },
        { id: 2, email: "email2", username: "name2", password: "rowValue1", phone: "rowValue1", address: "rowValue1", deliver: false },
        { id: 3,  email: "email3", username: "name3", password: "rowValue1", phone: "rowValue1", address: "rowValue1", deliver: true },
    ]);

    //companies
    await knex("companies").insert([
        { id: 1, name: "name1", address: "addr1" },
        { id: 2, name: "name2", address: "addr2" },
        { id: 3, name: "name3", address: "addr3" },
    ]);

     // warehouses
     await knex("warehouses").insert([
         { id: 1, name: "name1", description: "des1", address: "addr", company_id: 1 },
     ]);

     // roles
     await knex("roles").insert([
         { id: 1, name: "accountant", description: "kế toán"},
         { id: 2, name: "warehouseman", description: "quản kho"},
         { id: 3, name: "emp", description: "nhân viên"},
     ]);

     // products
     await knex("products").insert([
         { id: 1, name: "thuốc 1", description: "thuốc 1", price: 10000, unit: "gói"},
         { id: 2, name: "thuốc 2", description: "thuốc 2", price: 20000, unit: "gói"},
         { id: 3, name: "thuốc 3", description: "thuốc 3", price: 30000, unit: "kg"},
     ]);

     // invoices
     await knex("invoices").insert([
         { id: 1, cost: 20000, biller_id: 1},
         { id: 2, cost: 30000, biller_id: 1},
     ]);

     // invoices_products
     await knex("invoices_products").insert([
         { id: 1, invoice_id: 1, product_id: 2, cost: 20000, quantity_document: 1, actual_quantity: null},
         { id: 2, invoice_id: 2, product_id: 1, cost: 10000, quantity_document: 1, actual_quantity: null},
         { id: 3, invoice_id: 2, product_id: 2, cost: 20000, quantity_document: 1, actual_quantity: null},
     ]);

     // users_roles
     await knex("users_roles").insert([
         { id: 1, user_id: 1, role_id: 1},
         { id: 2, user_id: 1, role_id: 3},
         { id: 3, user_id: 2, role_id: 2},
         { id: 4, user_id: 2, role_id: 3},
     ]);

     // receipts
     await knex("receipts").insert([
        { id: 1, code: 'DL-100', owe: 123, have: 321, form: 1, invoice_id: 1, receiving_party_id: 1, delivering_party_id: 2, warehouses_id: 1, creator_name: 'test', deliver_name: 'test', warehouseman_name: 'test', accountant_name: 'test'},
     ]);
};
