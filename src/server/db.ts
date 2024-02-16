import "dotenv/config";
import { Kysely, PostgresDialect } from "kysely";
import type { DB } from "kysely-codegen";
import PG from "pg";
const Pool = PG.Pool;

export const pool = new Pool({
  //TODO change these two to .env
  host:
    process.env.NODE_ENV === "production"
      ? process.env.PG_SERVICE
      : "127.0.0.1",
  database:
    process.env.NODE_ENV === "production" ? "sh-tracker" : "sh-tracker_dev",
  password: process.env.PSQL_PASSWORD,
  user: process.env.PSQL_USERNAME,
  port: 5432,
});

const dialect = new PostgresDialect({
  pool,
});

export const db = new Kysely<DB>({
  log: ["error"],
  dialect,
});
