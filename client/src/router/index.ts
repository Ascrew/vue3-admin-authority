import {
  createRouter,
  createWebHashHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";
import Home from "../views/Home.vue";
import Layout from "@/layout/index.vue";

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () =>
          import(
            /* webpackChunkName: "redirect" */ "@/views/redirect/index.vue"
          ),
      },
    ],
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
    meta: { hidden: true },
  },
  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName: "404" */ "@/views/error-page/404.vue"),
    meta: { hidden: true },
  },
  {
    path: "/401",
    component: () =>
      import(/* webpackChunkName: "401" */ "@/views/error-page/401.vue"),
    meta: { hidden: true },
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/dashboard/index.vue"
          ),
        name: "Dashboard",
        meta: {
          title: "dashboard",
          icon: "qukuai",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1/menu1-1",
    name: "Nested",
    meta: {
      title: "nested",
      icon: "qukuai",
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/nested/menu1/index.vue"),
        redirect: "/nested/menu1/menu1-1",
        name: "Menu1",
        meta: { title: "menu1" },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/nested/menu1/menu1-1/index.vue"),
            name: "Menu1-1",
            meta: { title: "menu1-1" },
          },
          {
            path: "menu1-2",
            component: () => import("@/views/nested/menu1/menu1-2/index.vue"),
            name: "Menu1-2",
            redirect: "/nested/menu1/menu1-2/menu1-2-1",
            meta: { title: "menu1-2" },
            children: [
              {
                path: "menu1-2-1",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-1/index.vue"),
                name: "Menu1-2-1",
                meta: { title: "menu1-2-1" },
              },
              {
                path: "menu1-2-2",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-2/index.vue"),
                name: "Menu1-2-2",
                meta: { title: "menu1-2-2" },
              },
            ],
          },
          {
            path: "menu1-3",
            component: () => import("@/views/nested/menu1/menu1-3/index.vue"),
            name: "Menu1-3",
            meta: { title: "menu1-3" },
          },
        ],
      },
      {
        path: "menu2",
        name: "Menu2",
        component: () => import("@/views/nested/menu2/index.vue"),
        meta: { title: "menu2" },
      },
    ],
  },
  {
    path: "/blog",
    component: Layout,
    redirect: "/blog/markdown",
    name: "Blog",
    meta: {
      title: "blog",
      icon: "qukuai",
    },
    children: [
      {
        path: "markdown",
        name: "Markdown",
        component: () => import("@/views/blog/markdown.vue"),
        meta: { title: "markdown" },
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
    meta: { hidden: true },
  },
];
export const asyncRoutes: RouteRecordRaw[] = [];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export function resetRouter(): void {
  const newRouter = createRouter({
    history: createWebHashHistory(),
    routes: [],
  });
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
