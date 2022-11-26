import request from "@/utils/request";
import type { AxiosRes } from "@/model";

const devUrl = "/api";

export function login(params: {
  username: string;
  password: string;
}): Promise<AxiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/user/login`,
    data: params,
  });
}
