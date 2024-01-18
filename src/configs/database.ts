import Knex, { Knex as K } from "knex";
import path from "path";
import KnexLogger from "./knexLogging";

if (!process.env.DB_HOST) {
  require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
}

const config: { [key: string]: K.Config } = {
  production: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations",
      extension: "ts",
      directory: "../database/migrations/production",
    },
    seeds: {
      extension: "ts",
      directory: "../database/seeders/production",
    },
  },
};

const db = KnexLogger(Knex(config.production));

export async function checkDatabaseConnection() {
  try {
    await db.raw("select 1+1 as result");
    console.log(
      "Connection has been established successfully.  (main database)"
    );
  } catch (error) {
    console.error("Unable to connect to the database:  (main database)", error);
  }
}

export { db };

export default config;
