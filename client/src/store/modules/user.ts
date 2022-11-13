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
import store, { RootState } from "../index";
import { getToken, setToken, removeToken } from "@/utils/cookies";
import { axiosRes } from "@/entities/resInterface";
import { getUserInfo, logout } from "@/api/user";
import router, { resetRouter } from "@/router";

export type UserStore<S = UserState> = Omit<
  VuexStore<S>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

export interface UserState {
  token: string;
  name: string;
  avatar: string;
  introduction: string;
  roles: string[];
  email: string;
}

export interface Mutations<S = UserState> {
  SET_TOKEN(state: S, val: string): void;
  SET_NAME(state: S, val: string): void;
  SET_AVATAR(state: S, val: string): void;
  SET_INTRODUCTION(state: S, val: string): void;
  SET_ROLES(state: S, val: string[]): void;
  SET_EMAIL(state: S, val: string): void;
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<UserState, RootState>, "commit">;

export interface Actions {
  Login(
    { commit }: AugmentedActionContext,
    userinfo: { username: string; password: string }
  ): void;
  ResetToken({ commit }: AugmentedActionContext): void;
  GetUserInfo({ commit }: AugmentedActionContext): void;
  ChangeRoles({ commit }: AugmentedActionContext, role: string): void;
  LogOut({ commit }: AugmentedActionContext): void;
}

export default {
  state: {
    token: getToken() || "",
    name: "test",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    introduction: "",
    roles: [],
    email: "",
  } as UserState,
  mutations: {
    SET_TOKEN(state: UserState, val: string): void {
      state.token = val;
    },
    SET_NAME(state: UserState, val: string): void {
      state.name = val;
    },
    SET_AVATAR(state: UserState, val: string): void {
      state.avatar = val;
    },
    SET_INTRODUCTION(state: UserState, val: string): void {
      state.introduction = val;
    },
    SET_ROLES(state: UserState, val: string[]): void {
      state.roles = val;
    },
    SET_EMAIL(state: UserState, val: string): void {
      state.email = val;
    },
  } as Mutations<UserState>,
  actions: {
    async Login(
      { commit }: AugmentedActionContext,
      res: axiosRes
    ): Promise<void> {
      setToken(res.data.token);
      commit("SET_TOKEN", res.data.token);
    },

    ResetToken({ commit }: AugmentedActionContext) {
      removeToken();
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
    },

    async GetUserInfo({
      state,
      commit,
    }: AugmentedActionContext): Promise<void> {
      if (state.token === "") {
        throw Error("GetUserInfo: token is undefined!");
      }
      const { data } = await getUserInfo({} as undefined);
      if (!data) {
        throw Error("Verification failed, Please Login again");
      }
      const { roles, name, avatar, introduction, email } = data.user;
      if (!roles || roles.length <= 0) {
        throw Error("GetuserInfo: roles must be a non-null array!");
      }
      commit("SET_ROLES", roles);
      commit("SET_NAME", name);
      commit("SET_AVATAR", avatar);
      commit("SET_INTRODUCTION", introduction);
      commit("SET_EMAIL", email);
    },
    async ChangeRoles(
      { state, commit, dispatch, rootState }: AugmentedActionContext,
      role: string
    ): Promise<void> {
      // Dynamically modify permissions
      const token = role + "-token";
      commit("SET_TOKEN", token);
      setToken(token);
      await dispatch("GetUserInfo");
      resetRouter();
      // Generate dynamic accessible routes based on roles
      dispatch("GenerateRoutes", state.roles);
      // Add generated routes
      rootState.permission.dynamicRoutes.forEach((route) => {
        router.addRoute(route);
      });
      // Reset visited views and cached views
      dispatch("delAllViews");
    },
    async LogOut({
      state,
      commit,
      dispatch,
    }: AugmentedActionContext): Promise<void> {
      if (state.token === "") {
        throw Error("LogOut: token is undefined!");
      }
      await logout({} as undefined);
      removeToken();
      resetRouter();

      // Reset visited views and cached views
      dispatch("delAllViews");
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
    },
  } as ActionTree<UserState, RootState> & Actions,
};
