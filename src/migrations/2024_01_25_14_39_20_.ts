import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("weights")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("date", "timestamptz", (col) => col.notNull())
    .addColumn("weight", "decimal", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();

  //TODO limit to just one row on settings

  await db.schema
    .createTable("settings")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("imperial", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("settings").ifExists().execute();
  await db.schema.dropTable("weights").ifExists().execute();
}
