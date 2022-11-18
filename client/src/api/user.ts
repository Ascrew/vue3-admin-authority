import request from "@/utils/request";
import type { AxiosRes } from "@/model";

const devUrl = "/api";

export function getUserInfo(params: null | undefined): Promise<AxiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/user/userInfo`,
    data: params,
  });
}

export function logout(params: null | undefined): Promise<AxiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/user/logout`,
    data: params,
  });
}
