import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMuseumDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly openingTime: string;

  @IsNotEmpty()
  @IsString()
  readonly closingTime: string;

  @IsNotEmpty()
  @IsString()
  readonly location: string;

  @IsNotEmpty()
  @IsString()
  readonly categoryId: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsString()
  imageUrl: string = '';

  //   @IsEmail({}, { message: 'incorrect email' })
  //   readonly email: string;
}
