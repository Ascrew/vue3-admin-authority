import { Context } from 'koa';
import {
  SuccessModel,
  ParameterError,
  AuthError,
  NotFoundError,
  InternalServerError,
} from './../class/exceptions';

export const SUCCESS = async (ctx: Context, data: any, msg = 'success') => {
  new SuccessModel(200, msg, data).success(ctx);
};

// 权限限制
export const USER_NO_PERMISSION = async (ctx: Context, msg = '没有权限') =>
  new SuccessModel(2100, msg, null).success(ctx);

// 用户错误
export const USER_NOT_LOGIN = async (ctx: Context) =>
  new SuccessModel(2001, '用户未登录', null).success(ctx);

export const USER_ACCOUNT_EXPIRED = async (ctx: Context) =>
  new SuccessModel(2002, '账号已过期', null).success(ctx);

export const USER_ACCOUNT_DISABLE = async (ctx: Context) =>
  new SuccessModel(2003, '账号不可用', null).success(ctx);

export const USER_ACCOUNT_NOT_EXIST = async (ctx: Context) =>
  new SuccessModel(2004, '账号不存在', null).success(ctx);

export const USER_ACCOUNT_ALREADY_EXIST = async (ctx: Context, msg = '账号已存在') =>
  new SuccessModel(2005, msg, null).success(ctx);

export const USER_ACCOUNT_USE_BY_OTHERS = async (ctx: Context) =>
  new SuccessModel(2006, '账号下线', null).success(ctx);

export const USER_PWD_ERROR = async (ctx: Context) =>
  new SuccessModel(2007, '密码错误', null).success(ctx);

// 400
export const PARAM_NOT_VALID = async (ctx: Context, msg = '请求参数无效') =>
  new ParameterError(1001, msg).throwErr(ctx);

export const PARAM_IS_BLANK = async (ctx: Context, msg = '请求参数为空') =>
  new ParameterError(1002, msg).throwErr(ctx);

export const PARAM_TYPE_ERROR = async (ctx: Context, msg = '请求参数类型错误') =>
  new ParameterError(1003, msg).throwErr(ctx);

export const PARAM_NOT_COMPLETE = async (ctx: Context, msg = '请求参数缺失') =>
  new ParameterError(1004, msg).throwErr(ctx);

// 401
export const TOKEN_IS_BLANK = async (ctx: Context) =>
  new AuthError(4004, 'token为空').throwErr(ctx);

export const TOKEN_EXPIRED = async (ctx: Context) => new AuthError(4001, 'token过期').throwErr(ctx);

export const TOKEN_INVALID = async (ctx: Context) => new AuthError(4002, 'token无效').throwErr(ctx);

export const AUTHENTICATION_FAIL = async (ctx: Context, msg = '认证失败') =>
  new AuthError(4003, msg).throwErr(ctx);

// 404
export const NotFound = async (ctx: Context) =>
  new NotFoundError(404, '未找到api，请检查请求路径以及请求方法是否出错').throwErr(ctx);

// 500
export const FAIL = async (ctx: Context, msg: string) =>
  new InternalServerError(500, msg).throwErr(ctx);

export const FILE_UPLOAD_FAIL = async (ctx: Context) =>
  new InternalServerError(5001, '文件上传失败').throwErr(ctx);
