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
import Address from './Address';
import User from './User';

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
