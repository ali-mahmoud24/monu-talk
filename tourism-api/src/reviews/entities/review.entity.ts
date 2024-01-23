import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

import { Museum } from '../../museums/entities/museum.entity';
import { Max, Min } from 'class-validator';
import { User } from 'src/auth/user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Min(1)
  @Max(5)
  @Column({ type: 'int' })
  rating: number; // Rating out of 5

  @Column()
  comment: string;

  @Column()
  museumId: string;

  @ManyToOne((type) => Museum, (museum) => museum.reviews, {
    onDelete: 'CASCADE',
  })
  museum: Museum;

  @Column()
  userId: string;

  // @ManyToOne((type) => User, (user) => user.reviews, {
  //   onDelete: 'CASCADE',
  // })
  // user: User;
}
