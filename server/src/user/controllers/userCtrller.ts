import { getRepository } from 'typeorm';
import { Context } from 'koa';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import { UnauthorizedException } from '../../middlewares/exceptions';
import { JWT_SECRET } from '../../middlewares/constants';
import { User } from '../entity/userEntity';
import { Result } from '../../middlewares/restful';

export default class UserController {
  // 用户登录
  public static async login(ctx: Context) {
    const userRepository = getRepository(User);

    const user = await userRepository
      .createQueryBuilder()
      .where({ username: ctx.request.body.username })
      .addSelect('User.password')
      .getOne();

    if (!user) {
      ctx.status = 401;
      ctx.body = { message: '用户名不存在' };
    } else if (await argon2.verify(user.password, ctx.request.body.password)) {
      ctx.status = 200;
      ctx.body = { token: jwt.sign({ id: user.userId }, JWT_SECRET) };
      ctx.body = new Result(
        0,
        {
          token: jwt.sign({ id: (user as User).userId }, JWT_SECRET),
        },
        '更新成功',
      );
    } else {
      throw new UnauthorizedException('用户名不存在');
    }
  }

  // 用户注册
  public static async register(ctx: Context) {
    const userRepository = getRepository(User);

    // 创建新的用户实体
    const newUser = new User();
    newUser.nickname = ctx.request.body.nickname;
    newUser.username = ctx.request.body.username;
    newUser.email = ctx.request.body.email;
    newUser.password = await argon2.hash(ctx.request.body.password);

    // 保存用户数据
    const user = await userRepository.save(newUser);

    ctx.status = 200;
    ctx.body = user;
  }
}
