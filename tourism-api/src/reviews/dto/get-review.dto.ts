// import { Expose, Exclude, Transform } from 'class-transformer';
// import { Museum } from 'src/museums/entities/museum.entity';

// export class GetReviewDto {
//   @Expose()
//   id: string;

//   @Expose()
//   createdAt: Date;

//   @Expose()
//   rating: number;

//   @Expose()
//   comment: string;

//   @Exclude()
//   museumId: string;
//   @Exclude()
//   userId: string;

//   @Exclude()
//   museum: Museum;

//   @Expose()
//   get museumName(): string {
//     return `${this.museum.name}`;
//   }
// }
