import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Role } from './roleEntity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  nickname: string;

  @Column({ select: false })
  password: string;

  @Column()
  email: string;

  @ManyToMany(type => Role, role => role.users)
  roles: Role[];
}
