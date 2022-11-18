import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { createConnection } from 'typeorm'
import 'reflect-metadata'

import { protectRouter, unprotectedRouter } from './router/router'
import { logger } from './middlewares/logger'
import { errorCatch } from './middlewares/error'

import jwt from 'koa-jwt'
import { JWT_SECRET } from './middlewares/constants'

createConnection()
  .then(() => {
    // 初始化 Koa 应用实例
    const app = new Koa()

    app.use(errorCatch);

    // 注册中间件
    app.use(logger()) // 日志记录
    app.use(cors())
    app.use(bodyParser())

    // 错误处理中间件
    // app.use(async (ctx, next) => {
    //   try {
    //     await next()
    //   } catch (err) {
    //     console.log('middware was wrong in server.ts')
    //     ctx.status = err.status || 500
    //     ctx.body = { message: err.message }
    //   }
    // })

    // 响应用户请求 无需jwt
    app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods())

    // 注册 JWT 中间件
    app.use(jwt({ secret: JWT_SECRET }).unless({ method: 'GET' }))

    // 响应用户请求 需要jwt
    app.use(protectRouter.routes()).use(protectRouter.allowedMethods())
    // 响应用户请求
    // app.use((ctx) => {
    //   ctx.body = 'Hello Koa';
    // });

    // 运行服务器
    app.listen(3000)
  })
  .catch((err: string) => console.log('TypeORM connection error:', err))
