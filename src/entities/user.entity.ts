import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Purchase } from './purchase.entity';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 40 })
  firstName: string;

  @Column({ length: 40 })
  lastName: string;

  @Column({ nullable: true, default: null })
  refreshToken: string | null;

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Purchase[];
}
