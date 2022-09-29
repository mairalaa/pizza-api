import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Crust, Sauce, Size } from '../entities/item.entity';
import { Transform } from 'class-transformer';

export class ItemDto {
  @Transform(({ value }) => value.toUpperCase())
  @IsOptional()
  size?: Size;

  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(Sauce)
  @IsOptional()
  sauce?: Sauce;

  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(Crust)
  @IsOptional()
  crust?: Crust;

  @IsNotEmpty()
  name: string;
}
