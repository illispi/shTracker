import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import { appRouter } from './approuter';

//BUG need to enable cors only for domain in production

createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext() {
    console.log('context 3');
    return {};
  },
}).listen(3333);