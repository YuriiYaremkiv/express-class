import { App } from "./app.js";
import { LoggerService } from "./logger/logger.service";

async function bootStrap() {
  const app = new App(new LoggerService());
  await app.init();
}

bootStrap();
