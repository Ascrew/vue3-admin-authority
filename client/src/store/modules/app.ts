/*
 * @Author: zhangyu
 * @Date: 2022-07-20 15:47:37
 * @LastEditors: Please set LastEditors
 * @Description: 应用整体样式数据
 * @FilePath: src/store/modules/app.ts
 */

import {
  getSidebarStatus,
  getSize,
  setSidebarStatus,
  setLanguage,
  setSize,
} from "@/utils/cookies";
import { getLocale } from "@/lang";
import {
  ActionContext,
  ActionTree,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from "vuex";
import { RootState } from "../index";

export type AppStore<S = AppState> = Omit<
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

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface AppState {
  device: DeviceType;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  language: string;
  size: string;
}

export interface Mutations<S = AppState> {
  TOGGLE_SIDEBAR(state: S, val: boolean): void;
  CLOSE_SIDEBAR(state: S, val: boolean): void;
  TOGGLE_DEVICE(state: S, val: DeviceType): void;
  SET_INTRODUCTION(state: S, val: string): void;
  SET_LANGUAGE(state: S, val: string): void;
  SET_SIZE(state: S, val: string): void;
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<AppState, RootState>, "commit">;

export interface Actions {
  ToggleSideBar(
    { commit }: AugmentedActionContext,
    withoutAnimation: boolean
  ): void;
  CloseSideBar(
    { commit }: AugmentedActionContext,
    withoutAnimation: boolean
  ): void;
  ToggleDevice({ commit }: AugmentedActionContext, device: DeviceType): void;
  SetLanguage({ commit }: AugmentedActionContext, language: string): void;
  SetSize({ commit }: AugmentedActionContext, size: string): void;
}

export default {
  state: {
    sidebar: {
      opened: getSidebarStatus() !== "closed",
      withoutAnimation: false,
    },
    device: DeviceType.Desktop,
    language: getLocale(),
    size: getSize() || "default",
  } as AppState,
  mutations: {
    TOGGLE_SIDEBAR(state: AppState, val: boolean): void {
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = val;
      if (state.sidebar.opened) {
        setSidebarStatus("opened");
      } else {
        setSidebarStatus("closed");
      }
    },

    CLOSE_SIDEBAR(state: AppState, val: boolean): void {
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = val;
      setSidebarStatus("closed");
    },

    TOGGLE_DEVICE(state: AppState, val: DeviceType): void {
      state.device = val;
    },
    SET_LANGUAGE(state: AppState, val: string): void {
      state.language = val;
      setLanguage(val);
    },
    SET_SIZE(state: AppState, val: string): void {
      state.size = val;
      setSize(val);
    },
  } as Mutations,
  actions: {
    ToggleSideBar(
      { commit }: AugmentedActionContext,
      withoutAnimation: boolean
    ) {
      commit("TOGGLE_SIDEBAR", withoutAnimation);
    },
    CloseSideBar(
      { commit }: AugmentedActionContext,
      withoutAnimation: boolean
    ) {
      commit("CLOSE_SIDEBAR", withoutAnimation);
    },
    ToggleDevice({ commit }: AugmentedActionContext, device: DeviceType) {
      commit("TOGGLE_DEVICE", device);
    },
    SetLanguage({ commit }: AugmentedActionContext, language: string) {
      commit("SET_LANGUAGE", language);
    },
    SetSize({ commit }: AugmentedActionContext, size: string) {
      commit("SET_SIZE", size);
    },
  } as ActionTree<AppState, RootState> & Actions,
};
