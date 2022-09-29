import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  lastname: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  street: string;

  @IsNotEmpty()
  @IsString()
  houseNumber: string;

  @IsNotEmpty()
  @IsString()
  postcode: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  country: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  phone: string;
}
