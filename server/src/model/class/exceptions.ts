import { Context } from 'koa';
export class BaseException extends Error {
  status: number;
  message: string;
}

export class NotFoundException extends BaseException {
  status = 404;

  constructor(msg?: string) {
    super()
    this.message = msg || '无此内容'
  }
}

export class UnauthorizedException extends BaseException {
  status: 401;

  constructor(msg?: string) {
    super()
    this.message = msg || '尚未登录'
  }
}

export class ForbinddenException extends BaseException {
  status = 403;

  constructor(msg?: string) {
    super()
    this.message = msg || '权限不足'
  }
}

export class ServeException extends BaseException {
  status = 200;

  constructor(msg?: string) {
    super()
    this.message = msg || '服务器错误，请联系管理员'
  }
}

export class BaseModel {
  statusCode: number;
  code: number;
  msg: string;

  constructor() {
  }
}

export class ErrorModel extends BaseModel {

  statusCode: number;
  code: number;
  msg: string;

  constructor(code = 500, msg = "未知服务错误", statusCode = 500) {
    super();
    this.code = code;
    this.msg = msg;
    this.statusCode = statusCode;
  }
  throwErr(ctx: Context) {
    ctx.throw(this.statusCode, this.msg, {
      code: this.code,
      flag: 'ErrorModel'
    })
  }
}

// 400
export class ParameterError extends ErrorModel {
  constructor(code: number, msg = '请求错误') {
    super(code, msg, 400)
  }
}

// 401错误
export class AuthError extends ErrorModel {
  constructor(code: number, msg = "token认证失败") {
    super(code, msg, 401)
  }
}

// 404
export class NotFoundError extends ErrorModel {
  constructor(code: number, msg = "未找到该api") {
    super(code, msg, 404)
  }
}

// 500
export class InternalServerError extends ErrorModel {
  constructor(code: number, msg = "服务器内部错误") {
    super(code, msg, 500)
  }
}

// 200
export class SuccessModel extends BaseModel {
  data: any;
  constructor(code: number, msg: string, data: any) {
    super();
    this.code = code || 200
    this.msg = msg || '操作成功'
    if (data) {
      this.data = data
    }
  }
  success(ctx: Context) {
    // 所有的响应都是json，koa处理好的方式，直接用
    ctx.body = this
  }
}
