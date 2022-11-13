import request from "@/utils/request";
import { axiosRes } from "@/entities/resInterface";

const devUrl = "/api";
// const devUrl = ''

export function getBlogListApi(params: unknown): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/blog/getBlogs`,
    data: params,
  });
}

export function addOneBlogApi(params: unknown): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/blog/addBlog`,
    data: params,
  });
}

export function addBlogListApi(params: unknown): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/blog/addBlogList`,
    data: params,
  });
}

export function getBlogTypeDictApi(): Promise<axiosRes> {
  return request({
    method: "GET",
    url: `${devUrl}/blog/getBlogTypeDict`,
  });
}

export function getBlogByIdApi(params: unknown): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/blog/getBlogById`,
    data: params,
  });
}

export function updateBlogByIdApi(params: unknown): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/blog/updateBlogById`,
    data: params,
  });
}

export function hideOneBlogApi(params: unknown): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/blog/hideOneBlog`,
    data: params,
  });
}

export function showOneBlogApi(params: unknown): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/blog/showOneBlog`,
    data: params,
  });
}

export function hideBlogsApi(params: unknown): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/blog/hideBlogs`,
    data: params,
  });
}

export function getTableListApi(
  params: unknown,
  url: string
): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}` + url,
    data: params,
  });
}

export function getBlogTypeListApi(params: unknown): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/blog/getBlogTypes`,
    data: params,
  });
}

export function addBlogTypeListApi(params: unknown): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/blog/getBlogTypeById`,
    data: params,
  });
}

export function deleteBlogTypesApi(params: unknown): Promise<axiosRes> {
  return request({
    method: "POST",
    url: `${devUrl}/blog/deleteBlogTypes`,
    data: params,
  });
}
