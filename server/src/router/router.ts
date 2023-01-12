import Router from '@koa/router'
import userRouter from '../user/router/userRouter'

const unprotectedRouter = new Router()
const protectRouter = new Router()

userRouter(protectRouter, unprotectedRouter)

export { protectRouter, unprotectedRouter }
