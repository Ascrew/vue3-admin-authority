import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { User } from './userEntity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rolename: string;

  @ManyToMany(type => User, user => user.roles)
  users: User[];
}
