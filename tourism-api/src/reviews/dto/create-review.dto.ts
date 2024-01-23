import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number; // Rating out of 5

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsString()
  museumId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
