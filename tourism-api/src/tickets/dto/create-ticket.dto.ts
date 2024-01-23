import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  ticketDate: Date;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  nationality: string;

  @IsString()
  imageUrl: string = '';

  @IsNotEmpty()
  @IsString()
  museumId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
