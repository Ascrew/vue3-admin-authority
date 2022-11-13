import request from "@/utils/request";
import type { axiosRes } from "@/entities/resInterface";

const devUrl = "/api";

export function getUserListApi(
  params: unknown,
  url: string
): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}` + url,
    data: params,
  });
}

export function loginApi(params: {
  username: string;
  password: string;
}): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/user/login`,
    data: params,
  });
}

export function registerApi(params: {
  username: string;
  password: string;
  nickname: string;
  email: string;
}): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/user/register`,
    data: params,
  });
}
