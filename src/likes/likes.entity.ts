import { Posts } from 'src/posts/posts.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Likes {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'datetime', default: new Date().toISOString() })
  createdAt: string;

  @ManyToOne(() => Posts, (post) => post.likes)
  post: Posts;
}
