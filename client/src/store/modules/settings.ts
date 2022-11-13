/*
 * @Author: zhangyu
 * @Date: 2022-07-20 15:47:37
 * @LastEditors: Please set LastEditors
 * @Description: 用户整体样式
 * @FilePath: src/store/modules/app.ts
 */

import {
  ActionContext,
  ActionTree,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from "vuex";
import { RootState } from "../index";
import elementVariables from "@/styles/element-variables.scss";
import defaultSettings from "@/settings";

export enum DeviceType {
  Mobile,
  Desktop,
}

export type SettingsStore<S = SettingsState> = Omit<
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

export interface SettingsState {
  showSettingsDrawer: boolean;
  theme: string;
  fixedHeader: boolean;
  showSettings: boolean;
  showTagsView: boolean;
  showSidebarLogo: boolean;
  sidebarTextTheme: boolean;
}

export interface Mutations<S = SettingsState> {
  CHANGE_SETTING(state: S, payload: { key: string; value: any }): void;
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<SettingsState, RootState>, "commit">;

export interface Actions {
  ChangeSetting(
    { commit }: AugmentedActionContext,
    payload: { key: string; value: any }
  ): void;
  ToggleDrawer({ commit }: AugmentedActionContext, value: boolean): void;
}

export default {
  state: {
    showSettingsDrawer: false,
    theme: elementVariables.theme,
    fixedHeader: defaultSettings.fixedHeader,
    showSettings: defaultSettings.showSettings,
    showTagsView: defaultSettings.showTagsView,
    showSidebarLogo: defaultSettings.showSidebarLogo,
    sidebarTextTheme: defaultSettings.sidebarTextTheme,
  },
  mutations: {
    CHANGE_SETTING(state: SettingsState, payload: { key: string; value: any }) {
      const { key, value } = payload;
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        state[key] = value;
      }
    },
  } as Mutations,
  actions: {
    ChangeSetting(
      { commit }: AugmentedActionContext,
      payload: { key: string; value: any }
    ) {
      commit("CHANGE_SETTING", payload);
    },
  } as ActionTree<SettingsState, RootState> & Actions,
};
