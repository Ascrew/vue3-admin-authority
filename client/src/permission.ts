import router from "./router";
import { RouteLocationNormalized } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import i18n from "@/lang"; // Internationalization
import settings from "./settings";
import { useStore } from "@/store";
import { ElMessage } from "element-plus";

const store = useStore();
NProgress.configure({ showSpinner: false });

const whiteList = ["/login", "/auth-redirect"];

const getPageTitle = (key: string) => {
  // const hasKey = (i18n as any).te(`route.${key}`);
  // if (hasKey) {
  //   const pageName = (i18n as any).t(`route.${key}`);
  //   return `${pageName} - ${settings.title}`;
  // }
  return `${settings.title}`;
};

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: any
  ) => {
    NProgress.start();
    // determine whether the user has logged in
    if (store.state.user.token) {
      // 已经登录过 不进入登录页 直接回到首页
      if (to.path === "/login") {
        next({ path: "/" });
        NProgress.done();
      } else {
        // Check whether the user has obtained his permission roles
        if (store.state.user.roles.length === 0) {
          try {
            // await store.dispatch("GetUserInfo");
            // const roles = store.state.user.roles;
            // Generate accessible routes map based on role
            store.dispatch("GenerateRoutes", ["admin"]);
            // Dynamically add accessible routes
            // store.state.permission.dynamicRoutes.forEach((route) => {
            //   router.addRoute(route);
            // });
            // Hack: ensure addRoutes is complete
            // Set the replace: true, so the navigation will not leave a history record
            // next({ ...to, replace: true });

            // next(...)一定要有判断逻辑 不然会无限触发
            next();
          } catch (err) {
            store.dispatch("ResetToken");
            ElMessage.error("err" || "hsa error in router beforeEach");
            next(`/login?redirect=${to.path}`);
            NProgress.done();
          }
        } else {
          next();
        }
      }
    } else {
      // has no token
      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next();
      } else {
        // Other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  }
);

router.afterEach((to: RouteLocationNormalized) => {
  // Finish progress bar
  // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
  NProgress.done();
  // set page title
  document.title = getPageTitle(to.meta.title as string);
});
