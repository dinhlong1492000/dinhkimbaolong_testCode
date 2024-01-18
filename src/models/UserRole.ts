/* eslint-disable import/no-cycle */
import { db } from "@n-configs/database";
import { ExtendedModel } from "./ExtendedModel";

class UserRole extends ExtendedModel {
  id!: number;

  user_id!: number;

  role_id!: number;

  created_at?: Date | null;

  updated_at?: Date | null;

  static tableName = "users_roles";

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
      user_id: { type: "integer" },
      role_id: { type: "integer" },
    },
  };
}

const UserRoleModel = UserRole.bindKnex(db);
export default UserRoleModel;