import Router from '@koa/router'
import UserController from '../controllers/userCtrller'
import UserAdminCtrller from '../controllers/userAdminCtrller'

export default function userRouter (protectRouter: Router, unprotectedRouter: Router) {
  unprotectedRouter.post('/user/login', UserController.login)
  unprotectedRouter.post('/user/register', UserController.register)
  unprotectedRouter.post('/testResf', UserController.testResf)

  // admin
  unprotectedRouter.post('/user/getUserList', UserAdminCtrller.getUserList)
}
