import { IsString } from 'class-validator';

export class CreateMuseumDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly location: string;

  @IsString()
  readonly categoryId: string;

  @IsString()
  readonly description: string;

  @IsString()
  imageUrl: string = '';

  //   @IsEmail({}, { message: 'incorrect email' })
  //   readonly email: string;
}
