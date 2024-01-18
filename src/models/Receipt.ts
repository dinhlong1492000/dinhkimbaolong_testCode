/* eslint-disable import/no-cycle */
import { db } from "@n-configs/database";
import { ExtendedModel } from "./ExtendedModel";

class Receipt extends ExtendedModel {
  id!: number;

  code!: string;

  owe: number;

  have: number;

  form!: number;

  invoice_id!: number;

  receiving_party_id!: number;

  delivering_party_id!: number;

  warehouses_id: number;

  creator_name: string;

  deliver_name?: string;

  warehouseman_name?: string;

  accountant_name?: string;

  created_at?: Date | null;

  updated_at?: Date | null;

  static tableName = "receipts";

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
      code: { type: "string", maxLength: 25 },
      owe: { type: "integer" },
      have: { type: "integer" },
      form: { type: "integer" },
      invoice_id: { type: "integer" },
      receiving_party_id: { type: "integer" },
      delivering_party_id: { type: ["number", "null"] },
      warehouses_id: { type: ["number", "null"] },
      creator_string: { type: "string" },
      deliver_string: { type: ["string", "null"] },
      warehouseman_string: { type: ["string", "null"] },
      accountant_string: { type: ["string", "null"] },
      created_at: { type: "string", format: "date-time" },
      updated_at: { type: "string", format: "date-time" },
    },
  };
}

const ReceiptModel = Receipt.bindKnex(db);

export default ReceiptModel;