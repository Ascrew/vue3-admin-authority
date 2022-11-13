import request from "@/utils/request";
import type { axiosRes } from "@/entities/resInterface";

// const devUrl = '/api'
const devUrl = "";
export function getEntity(): Promise<axiosRes> {
  return request({
    method: "GET",
    url: `${devUrl}/blog/getBlogPageList`,
  });
}
