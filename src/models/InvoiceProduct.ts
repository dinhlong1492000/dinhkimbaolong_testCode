import { db } from "@n-configs/database";
import { ExtendedModel } from "./ExtendedModel";

class InvoiceProduct extends ExtendedModel {
  id!: number;

  invoice_id!: number;

  product_id!: number;

  cost?: number;

  quantity_document?: number;

  actual_quantity?: number;

  created_at?: Date | null;

  updated_at?: Date | null;

  static tableName = "invoices_products";

  $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }

  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "integer" },
      invoice_id: { type: "integer" },
      product_id: { type: "integer" },
      cost: { type: "integer" },
      quantity_document: { type: "integer" },
      actual_quantity: { type: "integer" },
    },
  };
}

const InvoiceProductModel = InvoiceProduct.bindKnex(db);
export default InvoiceProductModel;