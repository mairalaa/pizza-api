import { ArrayMinSize, IsNotEmpty, ValidateNested } from 'class-validator';
import { ItemDto } from './item.dto';
import { Type } from 'class-transformer';
import { AddressDto } from '../../address/dto/address.dto';

export class OrderDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ArrayMinSize(1, {
    message: 'You must add at least one item to create an order',
  })
  @Type(() => ItemDto)
  items: ItemDto[];

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  deliveryAddress: AddressDto;
}
