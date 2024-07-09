import express, { Express } from 'express';
import { container } from '../../ioc';
import { Controller } from '../../controllers/Controller';
import { HttpServer } from '../../domain/http/HttpServer';
import { ExpressRequestBodyValidator } from './ExpressRequestBodyValidator';

export class ExpressHttpServer implements HttpServer<Express> {
  create() {
    const app = express();
    app.use(express.json());

    this.registerRoutes(app);

    return {
      app,
      listen: (port: number) => {
        app.listen(port, () => {
          console.log(`Listening at :${port}`);
        });
      },
    };
  }

  private registerRoutes(app: Express) {
    const orderCreateController = this.getController('controllers.OrderCreate');
    const ordersReadController = this.getController('controllers.OrdersRead');

    app
      .route('/orders')
      .post(...orderCreateController)
      .get(...ordersReadController);

    const orderStatusUpdateController = this.getController('controllers.OrderStatusUpdate');

    app
      .patch('/orders/:orderId/status', ...orderStatusUpdateController);
  }

  private getController(controllerId: string) {
    const controller = container.get<Controller>(controllerId);

    if (controller.bodySchema) {
      const bodyValidator = new ExpressRequestBodyValidator();

      return [
        bodyValidator.getValidationHandler(controller.bodySchema),
        controller.handle.bind(controller),
      ];
    }

    return [
      controller.handle.bind(controller),
    ];
  }
}