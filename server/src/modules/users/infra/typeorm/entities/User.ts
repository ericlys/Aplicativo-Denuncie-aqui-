import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import Denunciation from '@modules/denunciations/infra/typeorm/entities/Denunciation';
import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: () => 'false' })
  checked: boolean;

  @Column({ default: () => 'false' })
  administrator: boolean;

  @OneToMany(() => Denunciation, denunciations => denunciations.user, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'user_id' })
  denunciations: Denunciation[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/${this.avatar}`
      : null;
  }
}

export default User;
