import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm'
import { BlogType } from '../entity/blogTypeEntity'

@Entity()
export class Blog {
  @PrimaryGeneratedColumn({ name: 'id' })
  blogId: number;

  @Column({ name: 'title' })
  title: string;

  @ManyToOne(type => BlogType, blogType => blogType.blogs)
  @JoinColumn({ name: 'blog_type' })
  blogType: BlogType;

  @Column('text', { name: 'content' })
  content: string;

  @Column({ name: 'create_time', default: () => 'NOW()' })
  createTime: Date;

  @Column({ name: 'last_update_time', default: () => 'NOW()' })
  lastUpdateTime: Date;

  @Column({ name: 'is_show', default: true })
  isShow: boolean;
}
