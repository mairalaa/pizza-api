import { OrderDto } from '../../dto/order.dto';
import { Size } from '../../entities/item.entity';

export const createOrderStub: OrderDto = {
  deliveryAddress: {
    firstname: 'Akiburr',
    lastname: 'Rahman',
    street: 'Billweise',
    houseNumber: '21',
    postcode: '21033',
    city: 'Hamburg',
    country: 'DE',
    phone: '12324234234',
  },
  items: [
    { name: 'Pizza Caprese', size: Size.CLASSIC },
    { name: 'Pizza Margherita', size: Size.LARGE },
  ],
};
