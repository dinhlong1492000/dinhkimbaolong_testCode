import { db } from "@n-configs/database";
import { Model } from "objection";
import InvoiceProductModel from "./InvoiceProduct";
import ProductModel from "./Product";
import { ExtendedModel } from "./ExtendedModel";

class Invoice extends ExtendedModel {
  id!: number;

  cost!: number;

  biller_id: number;

  created_at?: Date | null;

  updated_at?: Date | null;

  static tableName = "invoices";

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
      cost: { type: "integer" },
      biller_id: { type: "integer" },
      created_at: { type: "string", format: "date-time" },
      updated_at: { type: "string", format: "date-time" },
    },
  };
}

const InvoiceModel = Invoice.bindKnex(db);

export default InvoiceModel;

InvoiceModel.relationMappings = {
  products: {
    relation: Model.ManyToManyRelation,
    modelClass: () => ProductModel,
    join: {
      from: "invoices.id",
      through: {
        from: "invoices_products.invoice_id",
        to: "invoices_products.product_id",
      },
      to: "products.id",
    },
  },
  invoices_products: {
    relation: Model.HasManyRelation,
    modelClass: () => InvoiceProductModel,
    join: {
      from: "invoices.id",
      to: "invoices_products.invoice_id",
    },
  },
};
