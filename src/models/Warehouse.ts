import { db } from "@n-configs/database";
import { ExtendedModel } from "./ExtendedModel";

class Warehouse extends ExtendedModel {
  id!: number;

  name!: string;

  address: string;

  description: string;

  company_id!: number;

  created_at?: Date | null;

  updated_at?: Date | null;

  static tableName = "warehouses";

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
      name: { type: "string" },
      address: { type: "string" },
      company_id: { type: "integer" },
      description: { type: "string" },
      created_at: { type: "string", format: "date-time" },
      updated_at: { type: "string", format: "date-time" },
    },
  };
}

const WarehouseModel = Warehouse.bindKnex(db);

export default WarehouseModel;
