import { getRepository } from 'typeorm';
import { Context } from 'koa';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../middlewares/constants';

import { User } from '../entity/userEntity';
import { Result } from '../../middlewares/restful';
import { UserInterface } from '../../model/index';
import { UnauthorizedException } from '../../model/class/exceptions';
import { HttpStatusCode } from '../../model';

export default class UserController {
  // 用户登录
  public static async login(ctx: Context) {
    const userRepository = getRepository(User);
    const body = ctx.request.body as UserInterface;
    const user = await userRepository
      .createQueryBuilder()
      .where({ username: body.username })
      .addSelect('User.password')
      .getOne();

    if (!user) {
      ctx.status = 401;
      ctx.body = { message: '用户名不存在' };
    } else if (await argon2.verify(user.password, body.password)) {
      ctx.status = 200;
      ctx.body = { token: jwt.sign({ id: user.id }, JWT_SECRET) };
      ctx.body = new Result(
        0,
        {
          token: jwt.sign({ id: (user as User).id }, JWT_SECRET),
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
    const body = ctx.request.body as UserInterface;

    // 创建新的用户实体
    const newUser = new User();
    newUser.nickname = body.nickname;
    newUser.username = body.username;
    newUser.email = body.email;
    newUser.password = await argon2.hash(body.password);

    // 保存用户数据
    const user = await userRepository.save(newUser);

    ctx.status = 200;
    ctx.body = user;
  }

  // 测试接口
  public static async testResf(ctx: Context) {
    console.log(ctx.request.body);
    let data = [{ name: 'zhangyu', age: 24 }];
    await HttpStatusCode.PARAM_NOT_VALID(ctx);
  }
}
