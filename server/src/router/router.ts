import Router from '@koa/router'
import userRouter from '../user/router/userRouter'
import blogRouter from '../blog/router/blogRouter'

const unprotectedRouter = new Router()
const protectRouter = new Router()

userRouter(protectRouter, unprotectedRouter)
blogRouter(protectRouter, unprotectedRouter)

export { protectRouter, unprotectedRouter }
