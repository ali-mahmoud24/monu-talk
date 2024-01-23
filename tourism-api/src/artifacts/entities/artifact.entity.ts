import { Museum } from '../../museums/entities/museum.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artifact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  museumId: string;

  @ManyToOne((type) => Museum, (museum) => museum.artifacts, {
    onDelete: 'CASCADE',
  })
  museum: Museum;

  @Column()
  name: string;

  @Column()
  description: string;

  // @Column({ nullable: true })
  // imageUrl: string;

  @Column('text', { array: true, default: '{}' })
  imageUrlList: string[];
}
