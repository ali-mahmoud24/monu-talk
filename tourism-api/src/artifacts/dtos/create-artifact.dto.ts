import { IsString, Length } from 'class-validator';

export class CreateArtifactDto {
  @IsString()
  readonly museumId: string;

  @IsString()
  readonly name: string;

  @IsString()
  // @Length()
  readonly description: string;

  @IsString()
  imageUrl: string = '';
}
