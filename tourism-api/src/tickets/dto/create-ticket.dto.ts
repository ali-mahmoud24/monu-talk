import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  ticketDate: Date;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity: number;

  // @IsNotEmpty()
  // @IsNumber()
  // @Min(0)
  totalPrice: number;


  @IsNotEmpty()
  @IsString()
  nationality: string;

  // @IsString()
  // imageUrl: string = '';

  @IsNotEmpty()
  @IsString()
  museumId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
