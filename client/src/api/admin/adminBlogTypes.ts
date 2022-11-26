import request from "@/utils/request";
import type { AxiosRes } from "@/model";

const devUrl = "/api";
// const devUrl = ''

export function findBlogTypeByIdApi(params: unknown): Promise<AxiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/blog/getBlogTypeById`,
    data: params,
  });
}

export function addOneBlogTypeApi(params: {
  typeName: string;
}): Promise<AxiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/blog/addOneBlogType`,
    data: params,
  });
}

export function updateBlogTypeByIdApi(params: unknown): Promise<AxiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/blog/updateOneBlogType`,
    data: params,
  });
}

export function getBlogTypeDictApi(): Promise<AxiosRes> {
  return request({
    method: "GET",
    url: `${devUrl}/blog/getBlogTypeDict`,
  });
}
