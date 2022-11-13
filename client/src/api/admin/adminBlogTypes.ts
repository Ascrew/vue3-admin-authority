import request from "@/utils/request";
import type { axiosRes } from "@/entities/resInterface";

const devUrl = "/api";
// const devUrl = ''

export function findBlogTypeByIdApi(params: unknown): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/blog/getBlogTypeById`,
    data: params,
  });
}

export function addOneBlogTypeApi(params: {
  typeName: string;
}): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/blog/addOneBlogType`,
    data: params,
  });
}

export function updateBlogTypeByIdApi(params: unknown): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/blog/updateOneBlogType`,
    data: params,
  });
}

export function getBlogTypeDictApi(): Promise<axiosRes> {
  return request({
    method: "GET",
    url: `${devUrl}/blog/getBlogTypeDict`,
  });
}
