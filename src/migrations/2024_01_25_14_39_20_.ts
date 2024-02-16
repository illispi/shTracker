import type { Kysely } from "kysely";
import { sql } from "kysely";
import { DB } from "kysely-codegen/dist/db";

export async function up(db: Kysely<DB>): Promise<void> {
	await db.schema
		.createTable("weight")
		.addColumn("id", "serial", (col) => col.primaryKey())
		.addColumn("date", "timestamptz", (col) => col.notNull())
		.addColumn("weight", "decimal", (col) => col.notNull())
		.addColumn("created_at", "timestamptz", (col) =>
			col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
		)
		.execute();

	//NOTE test that user is unique

	await db.schema
		.createTable("settings")
		.addColumn("id", "serial", (col) => col.primaryKey())
		.addColumn("user", "integer", (col) =>
			col.references("weight.id").onDelete("cascade").notNull().unique(),
		)
		.addColumn("imperial", "boolean", (col) => col.notNull().defaultTo(false))
		.addColumn("created_at", "timestamptz", (col) =>
			col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
		)
		.execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
	await db.schema.dropTable("settings").ifExists().execute();
	await db.schema.dropTable("weight").ifExists().execute();
}
