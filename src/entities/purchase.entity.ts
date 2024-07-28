import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Purchase {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('float')
  value: number;

  @ManyToOne(() => User, (user) => user.purchases)
  user: User;
}
