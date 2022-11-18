import { Context } from 'koa'
import { getRepository, Repository } from 'typeorm'

import { ServeException } from '../../model/class/exceptions'
import { Blog } from '../entity/blogEntity'
import { BlogType } from '../entity/blogTypeEntity'

import { Result } from '../../middlewares/restful'

export default class BlogController {
  // to do 批量新增 测试用例
  public static async addBlogList (ctx: Context) {
    const blogType1: BlogType = await getRepository(BlogType)
      .createQueryBuilder('blogType')
      .where({ blogTypeId: 1 })
      .getOne() as BlogType

    const blogType2: BlogType = await getRepository(BlogType)
      .createQueryBuilder('blogType')
      .where({ blogTypeId: 2 })
      .getOne() as BlogType
    try {
      for (let i = 0; i < 29; i++) {
        const blogRepository = getRepository(Blog)
        const blog = new Blog()
        blog.title = '标题：' + i
        blog.content = '这一个博客的内容是：我是第' + i + '个博客'
        if (i < 20) {
          blog.blogType = blogType1
        } else {
          blog.blogType = blogType2
        }
        // blog.createTime = new Date()
        // blog.lastUpdateTime = new Date()
        blogRepository.save(blog)
      }
      ctx.status = 200
      ctx.body = { message: '批量添加成功' }
    } catch (error) {
      throw new ServeException(error)
    }
  }

  // // 新增博客
  // public static async addBlog (ctx: Context) {
  //   // 获取添加的博客类型
  //   const addBlogType: BlogType = await getRepository(BlogType)
  //     .createQueryBuilder()
  //     .where({ blogTypeId: ctx.request.body.blogTypeId })
  //     .getOne() as BlogType

  //   // 新建博客
  //   const blogRepository = getRepository(Blog)
  //   const newBLog = new Blog()
  //   newBLog.title = ctx.request.body.blogTitle
  //   newBLog.content = ctx.request.body.blogContent
  //   newBLog.blogType = addBlogType
  //   newBLog.createTime = new Date()
  //   newBLog.lastUpdateTime = new Date()
  //   try {
  //     // 保存
  //     blogRepository.save(newBLog)
  //     ctx.status = 200
  //     ctx.body = new Result(0, {}, '添加成功')
  //   } catch (error) {
  //     throw new ServeException(error)
  //   }
  // }

  // // 分页获取博客
  // public static async getBlogs (ctx: Context) {
  //   const params = ctx.request.body
  //   try {
  //     const blogRepository: Repository<Blog> = getRepository(Blog)
  //     let pageBlogsAndCount: [Blog[], number]
  //     if (!params.searchIsShowAll) {
  //       // 分页获取博客
  //       pageBlogsAndCount = await blogRepository
  //         .createQueryBuilder('blog')
  //         .leftJoinAndSelect('blog.blogType', 'blogType')
  //         .where('blog.title like :title', { title: `%${params.searchTitle}%` })
  //         .andWhere('blog.isShow = :isShow', { isShow: !params.searchIsShowAll })
  //         .skip((params.pageNum - 1) * params.pageSize)
  //         .take(params.pageSize)
  //       // .printSql()
  //         .getManyAndCount()
  //     } else {
  //       // 分页获取博客
  //       pageBlogsAndCount = await blogRepository
  //         .createQueryBuilder('blog')
  //         .leftJoinAndSelect('blog.blogType', 'blogType')
  //         .where('blog.title like :title', { title: `%${params.searchTitle}%` })
  //         .skip((params.pageNum - 1) * params.pageSize)
  //         .take(params.pageSize)
  //       // .printSql()
  //         .getManyAndCount()
  //     }

  //     const pageBlogs: Blog[] = pageBlogsAndCount[0]
  //     const blogCount: number = pageBlogsAndCount[1]

  //     ctx.status = 200
  //     ctx.body = {
  //       code: 0,
  //       message: '成功',
  //       data: {
  //         list: pageBlogs,
  //         pageCount: blogCount
  //       }
  //     }
  //   } catch (error) {
  //     console.log('listen error', error)
  //     throw new ServeException(error)
  //   }
  // }

  // // 根据id获取博客内容
  // public static async getBlogById (ctx: Context) {
  //   const blogId = ctx.request.body.blogId
  //   // console.log('listen params', ctx.request.body)
  //   if (!blogId) {
  //     throw new ServeException('缺少字段: blogId')
  //   }
  //   const blogRepository:Repository<Blog> = getRepository(Blog)
  //   try {
  //     const blog: Blog = await blogRepository
  //       .createQueryBuilder('blog')
  //       .where('blog.blogId = :blogId', { blogId: blogId })
  //       .getOne() as Blog
  //     ctx.status = 200
  //     ctx.body = new Result(0, blog, '查询成功')
  //   } catch (error) {
  //     throw new ServeException(error)
  //   }
  // }

  // // 根据id更改博客内容
  // public static async updateBlogById (ctx: Context) {
  //   const params = ctx.request.body

  //   // 获取添加的博客类型
  //   const blogType: BlogType = await getRepository(BlogType)
  //     .createQueryBuilder()
  //     .where({ blogTypeId: params.blogTypeId })
  //     .getOne() as BlogType
  //   const blogRepository: Repository<Blog> = getRepository(Blog)
  //   try {
  //     await blogRepository
  //       .createQueryBuilder('blog')
  //       .update(Blog)
  //       .set({
  //         title: params.blogTitle,
  //         blogType: blogType,
  //         content: params.blogContent,
  //         isShow: params.isShow,
  //         lastUpdateTime: new Date()
  //       })
  //       .where('blogId = :id', { id: params.blogId })
  //       .execute()
  //     ctx.status = 200
  //     ctx.body = new Result(0, {}, '更新成功')
  //   } catch (error) {
  //     throw new ServeException(error)
  //   }
  // }

  // // 根据id隐藏博客 (不是删除， 数据库还存在它的数据)
  // public static async hideOneBlog (ctx: Context) {
  //   const params = ctx.request.body
  //   const blogRepository: Repository<Blog> = getRepository(Blog)
  //   try {
  //     await blogRepository
  //       .createQueryBuilder('blog')
  //       .update(Blog)
  //       .set({
  //         isShow: false
  //       })
  //       .where('blogId = :id', { id: params.blogId })
  //       .execute()
  //     ctx.status = 200
  //     ctx.body = new Result(0, {}, '更新成功')
  //   } catch (error) {
  //     throw new ServeException(error)
  //   }
  // }

  // // 根据id显示博客
  // public static async showOneBlog (ctx: Context) {
  //   const params = ctx.request.body
  //   const blogRepository: Repository<Blog> = getRepository(Blog)
  //   try {
  //     await blogRepository
  //       .createQueryBuilder('blog')
  //       .update(Blog)
  //       .set({
  //         isShow: true
  //       })
  //       .where('blogId = :id', { id: params.blogId })
  //       .execute()
  //     ctx.status = 200
  //     ctx.body = new Result(0, {}, '更新成功')
  //   } catch (error) {
  //     throw new ServeException(error)
  //   }
  // }

  // // 批量隐藏数据
  // public static async hideBlogs (ctx: Context) {
  //   const params = ctx.request.body
  //   const blogRepository: Repository<Blog> = getRepository(Blog)
  //   try {
  //     for (const id of params.blogIds) {
  //       await blogRepository
  //         .createQueryBuilder('blog')
  //         .update(Blog)
  //         .set({
  //           isShow: false
  //         })
  //         .where('blogId = :id', { id: id })
  //         .execute()
  //     }
  //     ctx.status = 200
  //     ctx.body = new Result(0, {}, '更新成功')
  //   } catch (error) {
  //     throw new ServeException(error)
  //   }
  // }
}
