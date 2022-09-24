import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Likes {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'datetime', default: new Date().toISOString() })
  createdAt: string;
}
