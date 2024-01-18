/* eslint-disable import/no-cycle */
import { db } from "@n-configs/database";
import { ExtendedModel } from "./ExtendedModel";

class User extends ExtendedModel {
  id!: number;

  email!: string;

  username!: string;

  password!: string;

  phone?: string;

  address?: string;

  avatar_url?: string;

  company_id?: number;

  deliver?: boolean;

  date_of_birth?: Date | null;

  created_at?: Date | null;

  updated_at?: Date | null;

  static tableName = "users";

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
      email: { type: "string", maxLength: 255, format: "email" },
      username: { type: "string", maxLength: 255 },
      password: { type: "string", maxLength: 255 },
      phone: { type: ["string", "null"], maxLength: 255 },
      star: { type: ["number", "null"] },
      count_star: { type: ["number", "null"] },
      address: { type: ["string", "null"] },
      avatar_url: { type: ["string", "null"] },
      company_id: { type: "integer" },
      deliver: { type: "boolean" },
      date_of_birth: { type: ["string", "null"], format: "date-time" },
      created_at: { type: "string", format: "date-time" },
      updated_at: { type: "string", format: "date-time" },
    },
  };
}

const UserModel = User.bindKnex(db);

export default UserModel;