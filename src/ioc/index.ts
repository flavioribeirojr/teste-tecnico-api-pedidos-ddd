import { ContainerBuilder } from 'node-dependency-injection';
import { MongoOrderCreatorRepository } from '../infrastructure/MongoOrderCreatorRepository';
import { OrderCreator } from '../application/OrderCreator';
import { OrderCreateController } from '../controllers/OrderCreateController';
import { MongoOrderReadRepository } from '../infrastructure/MongoOrderReadRepository';
import { OrdersReader } from '../application/OrdersReader';
import { OrdersReadController } from '../controllers/OrdersReadController';
import { MongoOrderStatusUpdateRepository } from '../infrastructure/MongoOrderStatusUpdateRepository';
import { OrderStatusUpdater } from '../application/OrderStatusUpdater';
import { OrderStatusUpdateController } from '../controllers/OrderStatusUpdateController';
import { CreateOrderCommandHandler } from '../application/CreateOrderCommandHandler';
import { CommandHandlers } from '../infrastructure/cqrs/command/CommandHandlers';
import { InMemoryCommandBus } from '../infrastructure/cqrs/command/InMemoryCommandBus';
import { UpdateOrderStatusCommandHandler } from '../application/UpdateOrderStatusCommandHandler';
import { ReadOrdersQueryHandler } from '../application/ReadOrdersQueryHandler';
import { QueryHandlers } from '../infrastructure/cqrs/query/QueryHandlers';
import { InMemoryQueryBus } from '../infrastructure/cqrs/query/InMemoryQueryBus';

export const container = new ContainerBuilder();

export class ContainerRegisterer {
  register() {
    container.register('infra.OrderCreatorRepository', MongoOrderCreatorRepository);
    container
      .register('application.OrderCreator', OrderCreator)
      .addArgument(container.get('infra.OrderCreatorRepository'));

    container.register('infra.OrderReadRepository', MongoOrderReadRepository);
    container
      .register('application.OrdersReader', OrdersReader)
      .addArgument(container.get('infra.OrderReadRepository'));

    container.register('infra.OrderStatusUpdateRepository', MongoOrderStatusUpdateRepository);
    container
      .register('application.OrderStatusUpdater', OrderStatusUpdater)
      .addArgument(container.get('infra.OrderStatusUpdateRepository'));

    container
      .register('commandHandlers.CreateOrderCommand', CreateOrderCommandHandler)
      .addArgument(container.get('application.OrderCreator'))
      .addTag('commandHandler');

    container
      .register('commandHandlers.UpdateOrderStatusCommand', UpdateOrderStatusCommandHandler)
      .addArgument(container.get('application.OrderStatusUpdater'))
      .addTag('commandHandler');

    const commandHandlersDefinition = container
      .register('command.Handlers', CommandHandlers);

    const commandHandlers = [];

    for (const definition of container.findTaggedServiceIds('commandHandler')) {
      commandHandlers.push(container.get(definition.id));
    }

    commandHandlersDefinition.addArgument(commandHandlers);

    container
      .register('command.Bus', InMemoryCommandBus)
      .addArgument(container.get('command.Handlers'));

    container
      .register('commandQueries.ReadOrderQuery', ReadOrdersQueryHandler)
      .addArgument(container.get('application.OrdersReader'))
      .addTag('commandQuery');

    const queryHandlersDefinition = container.register('query.Handlers', QueryHandlers);
    const queryHandlers = [];

    for (const definition of container.findTaggedServiceIds('commandQuery')) {
      queryHandlers.push(container.get(definition.id));
    }

    queryHandlersDefinition.addArgument(queryHandlers);

    container
      .register('query.Bus', InMemoryQueryBus)
      .addArgument(container.get('query.Handlers'));

    container
      .register('controllers.OrderCreate', OrderCreateController)
      .addArgument(container.get('command.Bus'));

    container
      .register('controllers.OrdersRead', OrdersReadController)
      .addArgument(container.get('query.Bus'));

    container
      .register('controllers.OrderStatusUpdate', OrderStatusUpdateController)
      .addArgument(container.get('command.Bus'));
  }
}