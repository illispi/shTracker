import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { appRouter } from "./approuter";
import { db } from "./db";

//BUG need to enable cors only for domain in production
//TODO add serve-static
console.log("Bug, enable cors on production");

createHTTPServer({
	middleware: cors(),
	router: appRouter,
	createContext() {
		console.log("context 3");
		return { db };
	},
}).listen(3333);
