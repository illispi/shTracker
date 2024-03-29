import "dotenv/config";
import { Kysely, PostgresDialect } from "kysely";
import type { DB } from "kysely-codegen";
import PG from "pg";
const Pool = PG.Pool;
import fs from "fs";
import * as path from "path";

import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL("../../", import.meta.url));

async function parseJson(dir: string[]) {
	console.log(dir);

	const db = new Kysely<DB>({
		log: ["error", "query"],
		dialect: new PostgresDialect({
			pool: new Pool({
				host:
					process.env.NODE_ENV === "production"
						? "sh-tracker-postgres" //TODO switch to .env and for database below
						: "127.0.0.1",
				database:
					process.env.NODE_ENV === "production"
						? "sh-tracker"
						: "sh-tracker_dev",
				password: process.env.PSQL_PASSWORD,
				user: process.env.PSQL_USERNAME,
				port: 5432,
			}),
		}),
	});
	console.log(__dirname, "dirdir");

	const filePath = path.join(__dirname, "src/devData/weightloss.json");
	const arr = [];

	// Read the content of the JSON file
	const data = fs.readFileSync(filePath, "utf8");
	const jsonData = JSON.parse(data);
	console.log("🚀 ~ fs.readFile ~ jsonData:", jsonData);

	for (let i = 0; i < jsonData.length; i++) {
		if (jsonData[i].Paino !== "") {
			const [day, month, year] = jsonData[i]["P�iv�"].split(".");
			const weight = Number(
				typeof jsonData[i].Paino === "number"
					? jsonData[i].Paino
					: jsonData[i].Paino.replace(",", "."),
			);

			if (weight) {
				arr.push({
					weight: weight,
					date: new Date(`${year}-${month}-${day}`),
				});
			}
		}
	}
	console.log("🚀 ~ fs.readFile ~ arr:", arr);
	console.log("hello");

	for (let i = 0; i < arr.length; i++) {
		const test = await db
			.insertInto("weight")
			.values({
				weight: arr[i].weight,
				date: arr[i].date,
			})
			.executeTakeFirst();

		console.log(test);
	}

	await db.destroy();
}

parseJson(process.argv.slice(2));
