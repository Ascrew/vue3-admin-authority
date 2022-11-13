import request from "@/utils/request";
import type { axiosRes } from "@/entities/resInterface";

const devUrl = "/api";

export function getUserInfo(params: null | undefined): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/user/userInfo`,
    data: params,
  });
}

export function logout(params: null | undefined): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/user/logout`,
    data: params,
  });
}
