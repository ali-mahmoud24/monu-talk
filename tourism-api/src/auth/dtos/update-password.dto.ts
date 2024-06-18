import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be min 6 characters.' })
  readonly newPassword: string;
}
