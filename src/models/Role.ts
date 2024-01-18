/* eslint-disable import/no-cycle */
import { db } from "@n-configs/database";
import { ExtendedModel } from "./ExtendedModel";

class Role extends ExtendedModel {
  id!: number;

  name!: string;

  description: string;

  created_at?: Date | null;

  updated_at?: Date | null;

  static tableName = "roles";

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
      description: { type: "string" },
      created_at: { type: "string", format: "date-time" },
      updated_at: { type: "string", format: "date-time" },
    },
  };
}

const RoleModel = Role.bindKnex(db);

export default RoleModel;