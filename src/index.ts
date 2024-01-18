import "reflect-metadata";
import { checkDatabaseConnection } from "./configs/database";
import ExpressServer from "./ExpressServer";

async function bootstrap() {
  await checkDatabaseConnection();
}

function init() {
  const expressServer = new ExpressServer();
  expressServer.start();
}

bootstrap().then(() => {
  init();
});
