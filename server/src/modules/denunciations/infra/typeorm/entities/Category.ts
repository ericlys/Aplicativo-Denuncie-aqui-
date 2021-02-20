import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Denunciation from './Denunciation';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  icon: string;

  @OneToMany(() => Denunciation, denunciations => denunciations.category, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'category_id' })
  denunciations: Denunciation[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Category;
