import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import Address from '@modules/denunciations/infra/typeorm/entities/Address';
import Category from './Category';

@Entity('denunciations')
class Denunciation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: () => 'false' })
  anonymous: boolean;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  photo: string | null;

  @ManyToOne(() => User, user => user.denunciations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category, category => category.denunciations)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToOne(() => Address, denunciation => denunciation.address)
  address: Address;

  @CreateDateColumn()
  hour: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Denunciation;
