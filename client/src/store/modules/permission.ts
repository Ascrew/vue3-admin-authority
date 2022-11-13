/*
 * @Author: zhangyu
 * @Date: 2022-07-19 21:13:47
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: src/store/modules/user.ts
 */

import {
  ActionTree,
  ActionContext,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from "vuex";
import { RouteRecordRaw } from "vue-router";
import { RootState } from "../index";
import { constantRoutes, asyncRoutes } from "@/router/index";

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => (route.meta.roles as string[]).includes(role));
  } else {
    return true;
  }
};

export const filterAsyncRoutes = (
  routes: RouteRecordRaw[],
  roles: string[]
): RouteRecordRaw[] => {
  const res: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const r = { ...route };
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles);
      }
      res.push(r);
    }
  });
  return res;
};

export type PermissionStore<S = PermissionState> = Omit<
  VuexStore<S>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

export interface PermissionState {
  routes: RouteRecordRaw[];
  dynamicRoutes: RouteRecordRaw[];
}

export interface Mutations<S = PermissionState> {
  SET_ROUTES(state: S, val: RouteRecordRaw[]): void;
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<PermissionState, RootState>, "commit">;

export interface Actions {
  GenerateRoutes({ commit }: AugmentedActionContext, roles: string[]): void;
}

export default {
  state: {
    routes: [],
    dynamicRoutes: [],
  } as PermissionState,
  mutations: {
    SET_ROUTES(state: PermissionState, routes: RouteRecordRaw[]): void {
      state.routes = constantRoutes.concat(routes);
      state.dynamicRoutes = routes;
    },
  } as Mutations<PermissionState>,
  actions: {
    GenerateRoutes(
      { commit }: AugmentedActionContext,
      // userinfo: { username: string; password: string }
      roles: string[]
    ): void {
      let accessedRoutes;
      if (roles.includes("admin")) {
        accessedRoutes = asyncRoutes;
      } else {
        // 前端控制权限路由
        // accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);

        // 先不控制
        accessedRoutes = asyncRoutes;
      }
      commit("SET_ROUTES", accessedRoutes);
    },
  } as ActionTree<PermissionState, RootState> & Actions,
};
