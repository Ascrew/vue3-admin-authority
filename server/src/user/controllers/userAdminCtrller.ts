import { getRepository, Repository } from 'typeorm'
import { Context } from 'koa'

import { User } from '../entity/userEntity'
import { Result } from '../../middlewares/restful'
import { ServeException } from '../../model/class/exceptions'
import { PageParamsInterface } from '../../model/index'
import { UserInterface } from '../../model/index'

export default class UserController {
  // 分页获取用户
  public static async getUserList(ctx: Context) {
    const params = ctx.request.body as PageParamsInterface;
    try {
      const blogRepository: Repository<User> = getRepository(User)
      // 分页获取博客
      const pageUsersAndCount: [User[], number] = await blogRepository
        .createQueryBuilder('user')
        .where('user.nickname like :nickname', { nickname: `%${params.searchContent}%` })
        .skip((params.pageNum - 1) * params.pageSize)
        .take(params.pageSize)
        // .getQuery()
        .getManyAndCount()

      const pageUsers: User[] = pageUsersAndCount[0]
      const userCount: number = pageUsersAndCount[1]

      ctx.status = 200
      ctx.body = new Result(
        0,
        { list: pageUsers, pageCount: userCount },
        'success'
      )
    } catch (error) {
      throw new ServeException(error)
    }
  }

  public static async createUser(ctx: Context) {
    const userRepository = getRepository(User)
    const newUser = new User()
  }

  public static async updateByUserId(ctx: Context) {
    const params = ctx.request.body as UserInterface;
    const userRepository: Repository<User> = getRepository(User)
    try {
      await userRepository
        .createQueryBuilder('user')
        .update(User)
        .set({
          nickname: params.nickname,
          password: params.password,
        })
        .where('user.id: :id', { id: params.userId })
        .execute()
      ctx.status = 200
      ctx.body = new Result(0, {}, '更新成功')
    } catch (error) {
      throw new ServeException(error)
    }
  }
}
