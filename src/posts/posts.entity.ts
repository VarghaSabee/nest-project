import { Likes } from '../likes/likes.entity';
import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, BaseEntity } from 'typeorm';

@Entity()
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text', length: 140 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: false, name: 'active' })
  isActive: boolean;

  @Column({ type: 'datetime', default: new Date().toISOString() })
  createdAt: string;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: string; // "2022.09.23 15:52:15"

  @Column({ type: 'datetime', nullable: true })
  deletedAt: string;

  @OneToMany(() => Likes, (like) => like.post)
  likes: Likes[]

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
