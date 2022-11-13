import Router from '@koa/router'
import blogCtrller from '../controllers/blogCtrller'
import blogTypeCtrller from '../controllers/blogTypeCtrller'

export default function blogRouter (protectRouter: Router, unprotectedRouter: Router) {
  // blog
  unprotectedRouter.post('/blog/addBlog', blogCtrller.addBlog)
  unprotectedRouter.post('/blog/getBlogs', blogCtrller.getBlogs)
  unprotectedRouter.post('/blog/addBlogList', blogCtrller.addBlogList)
  unprotectedRouter.post('/blog/getBlogById', blogCtrller.getBlogById)
  unprotectedRouter.post('/blog/updateBlogById', blogCtrller.updateBlogById)
  unprotectedRouter.post('/blog/hideOneBlog', blogCtrller.hideOneBlog)
  unprotectedRouter.post('/blog/showOneBlog', blogCtrller.showOneBlog)
  unprotectedRouter.post('/blog/hideBlogs', blogCtrller.hideBlogs)
  unprotectedRouter.get('/blog/getBlogTypeDict', blogTypeCtrller.getBlogTypeDict)

  // blog type
  unprotectedRouter.post('/blog/getBlogTypes', blogTypeCtrller.getBlogTypes)
  unprotectedRouter.get('/blog/getBlogTypeById', blogTypeCtrller.getBlogTypeById)
  unprotectedRouter.post('/blog/addOneBlogType', blogTypeCtrller.addOneBlogType)
  unprotectedRouter.get('/blog/addBlogTypes', blogTypeCtrller.addBlogTypes)
  unprotectedRouter.get('/blog/updateOneBlogType', blogTypeCtrller.updateOneBlogType)
  unprotectedRouter.get('/blog/deleteOneBlogType', blogTypeCtrller.deleteOneBlogType)
  unprotectedRouter.get('/blog/deleteBlogTypes', blogTypeCtrller.deleteBlogTypes)
}
