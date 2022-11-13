import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  userId: number;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'nickname' })
  nickname: string;

  @Column({ name: 'password', select: false })
  password: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean;

  @Column({ name: 'is_show', default: false })
  isShow: boolean;
}
