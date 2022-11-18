import request from "@/utils/request";
import type { AxiosRes } from "@/model";

const devUrl = "/api";

export function getUserListApi(
  params: unknown,
  url: string
): Promise<AxiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}` + url,
    data: params,
  });
}

export function loginApi(params: {
  username: string;
  password: string;
}): Promise<AxiosRes> {
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
}): Promise<AxiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/user/register`,
    data: params,
  });
}

export function testResfApi(params: { test: "aa" }): Promise<AxiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/testResf`,
    data: params,
  });
}
