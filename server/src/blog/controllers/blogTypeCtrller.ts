import { Context } from 'koa'
import { getRepository, Repository } from 'typeorm'

import { ServeException } from '../../model/class/exceptions'
import { BlogType } from '../entity/blogTypeEntity'

import { Result } from '../../middlewares/restful'

export default class BlogTypeController {
  // 获取所有博客类型
  public static async getBlogTypeDict (ctx: Context) {
    console.log('listen params', ctx.request.body)
    const blogTypeRepository: Repository<BlogType> = getRepository(BlogType)
    try {
      const blogTypeList: BlogType[] = await blogTypeRepository
        .createQueryBuilder('blogType')
        .getMany()
      ctx.status = 200
      ctx.body = new Result(0, blogTypeList, 'success')
    } catch (error) {
      console.log(error)
      throw new ServeException(error)
    }
  }

  // 分页获取博客类型列表
  // public static async getBlogTypes (ctx: Context) {
  //   const params = ctx.request.body
  //   try {
  //     const blogTypeRepository: Repository<BlogType> = getRepository(BlogType)
  //     const pageAndCount: [BlogType[], number] = await blogTypeRepository
  //       .createQueryBuilder('blogType')
  //       .where('blogType.typeName like :typeName', { typeName: `%${params.searchContent}%` })
  //       .skip((params.pageNum - 1) * params.pageSize)
  //       .take(params.pageSize)
  //       .getManyAndCount()

  //     const pages: BlogType[] = pageAndCount[0]
  //     const counts: number = pageAndCount[1]

  //     ctx.status = 200
  //     ctx.body = new Result(
  //       0,
  //       {
  //         list: pages,
  //         pageCount: counts
  //       },
  //       'success')
  //   } catch (error) {
  //     console.log(error)
  //     throw new ServeException(error)
  //   }
  // }

  // // 根据类型id获取博客类型内容
  // public static async getBlogTypeById (ctx: Context) {
  //   const blogTypeRepository: Repository<BlogType> = getRepository(BlogType)
  //   const params = ctx.request.body
  //   try {
  //     const oneBlogType: BlogType = await blogTypeRepository
  //       .createQueryBuilder('blogType')
  //       .where({ blogTypeId: params.blogTypeId })
  //       .getOne() as BlogType
  //     ctx.status = 200
  //     ctx.body = new Result(0, oneBlogType, 'success')
  //   } catch (error) {
  //     throw new ServeException(error)
  //   }
  // }

  // // 保存一个博客类型
  // public static async addOneBlogType (ctx: Context) {
  //   const blogTypeRepository: Repository<BlogType> = getRepository(BlogType)
  //   const params = ctx.request.body
  //   try {
  //     const newBlogType = new BlogType()
  //     newBlogType.typeName = params.typeName
  //     blogTypeRepository.save(newBlogType)
  //     ctx.status = 200
  //     ctx.body = new Result(0, {}, 'success')
  //   } catch (error) {
  //     throw new ServeException(error)
  //   }
  // }

  // // 批量保存博客类型
  // public static async addBlogTypes (ctx: Context) {
  //   const blogTypeRepository: Repository<BlogType> = getRepository(BlogType)
  //   const params = ctx.request.body
  //   if (params.length < 1) {
  //     throw new ServeException('添加内容为空，请重新添加')
  //   }
  //   try {
  //     for (const typeName of params) {
  //       const newBlogType = new BlogType()
  //       newBlogType.typeName = typeName
  //       blogTypeRepository.save(newBlogType)
  //       ctx.status = 200
  //       ctx.body = new Result(0, {}, 'success')
  //     }
  //   } catch (error) {
  //     throw new ServeException(error)
  //   }
  // }

  // // 修改博客类型名称
  // public static async updateOneBlogType (ctx: Context) {
  //   const blogTypeRepository: Repository<BlogType> = getRepository(BlogType)
  //   const params = ctx.request.body
  //   try {
  //     await blogTypeRepository
  //       .createQueryBuilder('blogType')
  //       .update(BlogType)
  //       .set({
  //         typeName: params.typeName
  //       })
  //       .where({ blogTypeId: params.blogTypeId })
  //       .execute()
  //     ctx.status = 200
  //     ctx.body = new Result(0, {}, 'success')
  //   } catch (error) {
  //     throw new ServeException(error)
  //   }
  // }

  // // 删除一个博客类型
  // public static async deleteOneBlogType (ctx: Context) {
  //   const blogTypeRepository: Repository<BlogType> = getRepository(BlogType)
  //   const params = ctx.request.body
  //   try {
  //     await blogTypeRepository
  //       .createQueryBuilder('blogType')
  //       .delete()
  //       .from(BlogType)
  //       .where({ blogTypeId: params.blogTypeId })
  //       .execute()
  //     ctx.status = 200
  //     ctx.body = new Result(0, {}, '删除成功')
  //   } catch (error) {
  //     throw new ServeException(error)
  //   }
  // }

  // // 批量删除博客类型
  // public static async deleteBlogTypes (ctx: Context) {
  //   const blogTypeRepository: Repository<BlogType> = getRepository(BlogType)
  //   const params = ctx.request.body
  //   if (params.blogTypeIds.length < 1) {
  //     throw new ServeException('id列表空了')
  //   }
  //   try {
  //     for (const id of params.blogTypeIds) {
  //       await blogTypeRepository
  //         .createQueryBuilder('blogType')
  //         .delete()
  //         .from(BlogType)
  //         .where({ blogTypeId: id })
  //         .execute()
  //     }
  //     ctx.status = 200
  //     ctx.body = new Result(0, {}, '删除成功')
  //   } catch (error) {
  //     throw new ServeException(error)
  //   }
  // }
}
