import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { db } from "./db";
import { appRouter } from "./routes";
import { createContext } from "./serverContext";

//BUG need to enable cors only for domain in production
//TODO add serve-static
console.log("Bug, enable cors on production");

function signalHandler(signal) {
	// do some stuff here
	process.exit();
}

createHTTPServer({
	middleware: cors(),
	router: appRouter,
	createContext,
})
	.on("SIGINT", signalHandler)
	.on("SIGTERM", signalHandler)
	.on("SIGQUIT", signalHandler)
	.listen(3333);
