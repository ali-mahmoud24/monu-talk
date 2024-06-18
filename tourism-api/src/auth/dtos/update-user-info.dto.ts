import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserInfoDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
}
