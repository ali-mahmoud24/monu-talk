import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CLIENT,
  })
  role: Role;

  //   @OneToMany((type) => Ticket, ticket => ticket.User)
  //   tickets: Ticket[];
}
