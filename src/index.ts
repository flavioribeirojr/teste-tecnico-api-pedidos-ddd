import { ExpressHttpServer } from './infrastructure/http/ExpressHttpServer';
import { ContainerRegisterer } from './ioc';
import { startMongoDB } from './mongodb-starter';

(async () => {
  await startMongoDB();

  const containerRegister = new ContainerRegisterer();
  containerRegister.register();

  const server = new ExpressHttpServer();

  server
    .create()
    .listen(3000);
})();