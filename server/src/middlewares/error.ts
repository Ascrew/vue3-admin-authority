import { ErrorModel, BaseModel } from './../model/class/exceptions';
import { Context } from "koa"

const formatError = (err: BaseModel, ctx: Context) => {
  ctx.status = err.statusCode;
  ctx.body = {
    code: err.code,
    msg: err.msg,
  }
}

export const errorCatch = async (ctx: Context, next: Function) => {
  try {
    await next()
  }
  catch (err) {
    if (err.flag === 'ErrorModel') {
      formatError(err, ctx)
    } else {
      // 未知错误
      console.log('listen err in error.ts', err);
      formatError(new ErrorModel(), ctx)

    }
  }
}