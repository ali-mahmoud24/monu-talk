import { Exclude, Expose, Transform } from 'class-transformer';

export class GetMuseumDto {
  // @Expose({ name: 'id' }) // Expose as 'id'
  // @Transform(({ value }) => value.toString(), { toPlainOnly: true }) // Transform _id to string
  // readonly _id: string;

  @Exclude()
  readonly _id: string;

  readonly name: string;

  readonly imageUrl: string;

  readonly categoryId: string;

  readonly location: string;

  @Exclude()
  readonly artifactsIds: string[];

  constructor(partial: Partial<GetMuseumDto>) {
    Object.assign(this, partial);
  }
}
