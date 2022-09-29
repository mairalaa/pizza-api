import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { OrderTestModule } from './order.test.module';
import { OrderService } from '../order.service';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Sauce } from '../entities/item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createOrderStub } from './stubs/order.create.stub';

describe('Orders', () => {
  let app: INestApplication;
  let orderService: OrderService;
  let server: request.SuperTest<request.Test>;
  let orderRepository: Repository<Order>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [OrderTestModule],
    }).compile();

    app = module.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    orderService = module.get(OrderService);
    orderRepository = module.get(getRepositoryToken(Order));

    await app.init();
    server = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Order', () => {
    it('should accept an order with items and delivery address', async () => {
      const response = await server.post('/order').send(createOrderStub);
      expect(response.status).toBe(201);
      expect(response.body.items).toHaveLength(2);
      expect(response.body).toHaveProperty('id');
    });
  });

  it('should update an existing order with new items', async () => {
    const order = await orderRepository.save(createOrderStub);

    order.items = [
      ...order.items,
      { name: 'Pizza Cheeseburger', sauce: Sauce.HOLLANDAISE_SAUCE },
    ];

    const response = await server.put(`/order/${order.id}`).send(order);

    expect(response.status).toBe(200);
    expect(response.body.items).toHaveLength(3);
    expect(response.body).toHaveProperty('id');
  });
});
