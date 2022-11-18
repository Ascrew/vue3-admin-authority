import { ErrorModel, BaseModel } from './../model/class/exceptions';
import { Context } from 'koa';
import { HttpStatusCode } from '../model';

const formatError = (err: BaseModel, ctx: Context) => {
  ctx.status = err.statusCode;
  ctx.body = {
    code: err.code,
    msg: err.msg || err.message,
  };
};

export const errorCatch = async (ctx: Context, next: Function) => {
  try {
    await next();
    if (ctx.status === 404) {
      await HttpStatusCode.NotFound(ctx);
    }
  } catch (err) {
    if (err.flag === 'ErrorModel') {
      formatError(err, ctx);
    } else {
      // 未知错误
      formatError(new ErrorModel(undefined, err.message), ctx);
    }
  }
};
