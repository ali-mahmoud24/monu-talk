import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Museum } from '../../museums/entities/museum.entity';
import { User } from '../../auth/user.entity'; // Assuming you have a User entity

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //   @Column()
  //   ticketType: string; // Example: 'Adult', 'Child', 'Senior', etc.

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  purchaseDate: Date;

  @Column({ type: 'timestamp' })
  ticketDate: Date;

  @Column({ default: false })
  isCancelled: boolean;

  //   @Column({ type: 'decimal', precision: 10, scale: 2 })
  //   price: number;

  @Column()
  quantity: number;

  @Column()
  phoneNumber: string;

  @Column()
  nationality: string;

  // @Column()
  // imageUrl: string;

  @Column()
  museumId: string;

  @ManyToOne(() => Museum, (museum) => museum.tickets, { onDelete: 'CASCADE' })
  museum: Museum;

  @Column()
  userId: string;

  //   @ManyToOne(() => User, (user) => user.tickets)
  //   user: User;
}
