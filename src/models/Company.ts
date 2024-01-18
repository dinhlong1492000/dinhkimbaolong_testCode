/* eslint-disable import/no-cycle */
import { db } from "@n-configs/database";
import { ExtendedModel } from "./ExtendedModel";

class Company extends ExtendedModel {
  id!: number;

  name!: string;

  address: string;

  created_at?: Date | null;

  updated_at?: Date | null;

  static tableName = "companies";

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
      created_at: { type: "string", format: "date-time" },
      updated_at: { type: "string", format: "date-time" },
    },
  };
}

const CompanyModel = Company.bindKnex(db);

export default CompanyModel;