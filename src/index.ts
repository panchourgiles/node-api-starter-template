import 'module-alias/register';

import { config } from '@config/index';
import Logger from '@utils/logger';

import startApp from './app';

async function startServer() {
  const app = await startApp();
  app.listen(config.port, () => {
    Logger.info(`🚀 Server listening on port: ${config.port}`);
  });
}

startServer();
