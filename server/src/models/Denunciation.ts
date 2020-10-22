import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './User';

@Entity('denunciations')
class Denunciations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: () => 'false' })
  anonymous: boolean;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  zipcode: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  complement: string | null;

  @Column('numeric', { precision: 12, scale: 10 })
  latitude: number;

  @Column('numeric', { precision: 12, scale: 10 })
  longitude: number;

  @Column({ nullable: true })
  photo: string | null;

  @ManyToOne(() => User, user => user.denunciations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Denunciations;
