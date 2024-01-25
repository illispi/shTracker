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

  const db = new Kysely<any>({
    //TODO replace any with Database types
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

  const filePath = path.join(__dirname, "data/painonpudotuslogi.json");

  // Read the content of the JSON file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);
      console.log("🚀 ~ fs.readFile ~ jsonData:", jsonData);
      let arr = [];

      for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].Paino !== "" && typeof jsonData[i].Paino === "number") {
          arr.push({ weight: jsonData[i].Paino, date: jsonData[i]["P�iv�"] });
        }
      }
      console.log("🚀 ~ fs.readFile ~ arr:", arr);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
    }
  });

  await db.destroy();
}

parseJson(process.argv.slice(2));
