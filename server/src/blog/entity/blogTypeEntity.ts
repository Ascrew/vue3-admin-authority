import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import { Blog } from './blogEntity'

@Entity()
export class BlogType {
  @PrimaryGeneratedColumn({ name: 'id' })
  blogTypeId: number;

  @Column({ name: 'type_name' })
  typeName: string;

  @Column({ name: 'create_time', default: () => 'NOW()' })
  createTime: Date;

  @Column({ name: 'last_update_time', default: () => 'NOW()' })
  lastUpdateTime: Date;

  @OneToMany(type => Blog, blogs => blogs.blogType)
  @JoinColumn({ name: 'blogs' })
  blogs: Blog[];
}
