import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from './category.entity';
import { Artifact } from '../../artifacts/entities/artifact.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { Review } from 'src/reviews/entities/review.entity';

@Entity()
export class Museum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ type: 'time' })
  openingTime: string;

  @Column({ type: 'time' })
  closingTime: string;

  @Column({ nullable: true })
  ticketPrice: number;

  @Column()
  categoryId: string;

  @ManyToOne((type) => Category, (category) => category.museums)
  category: Category;

  // @OneToOne((type) => Category)
  // @JoinColumn()
  // category: Category;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @OneToMany((type) => Artifact, (artifact) => artifact.museum)
  artifacts: Artifact[];

  @OneToMany((type) => Ticket, (ticket) => ticket.museum)
  tickets: Ticket[];

  @OneToMany((type) => Review, (review) => review.museum)
  reviews: Review[];
}
