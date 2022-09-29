import { IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaymentDto {
  @MinLength(15)
  @MaxLength(16)
  @Transform(({ value }) => String(value))
  cardNumber: number;

  @IsString()
  @MinLength(1)
  cardHolder: string;

  @MinLength(3)
  @MaxLength(4)
  @Transform(({ value }) => String(value))
  cvv: number;
}
