import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Denunciation from './Denunciation';

@Entity('addresses')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToOne(() => Denunciation, address => address)
  @JoinColumn()
  denunciation: Denunciation;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Address;
