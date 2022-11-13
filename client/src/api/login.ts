import request from "@/utils/request";
import type { axiosRes } from "@/entities/resInterface";

const devUrl = "/api";

export function login(params: {
  username: string;
  password: string;
}): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/user/login`,
    data: params,
  });
}
