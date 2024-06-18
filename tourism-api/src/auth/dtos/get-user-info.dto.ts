import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserInfoDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly imageUrl: string;


  @IsNotEmpty()
  @IsString()
  readonly role: string;
}
