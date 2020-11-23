import startApp from './app';
import { config } from '@config';
import Logger from '@utils/logger';

async function startServer() {
  const app = await startApp();

  app.listen(config.port, (error) => {
    if (error) {
      process.exit(1);
      return;
    }
    Logger.info(`🚀 Server listening on port: ${config.port}`);
  });
}

startServer();
