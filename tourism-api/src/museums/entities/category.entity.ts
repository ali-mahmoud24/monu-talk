import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Museum } from './museum.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany((type) => Museum, (museum) => museum.category)
  museums: Museum[];
}
