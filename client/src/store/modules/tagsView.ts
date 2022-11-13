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
import { getUserInfo } from "@/api/user";
import router, { resetRouter } from "@/router";
import { RouteLocationNormalized } from "vue-router";

export type TagsViewStore<S = TagsViewState> = Omit<
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

export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string;
}

export interface TagsViewState {
  visitedViews: TagView[];
  cachedViews: (string | undefined)[];
}

export interface Mutations<S = TagsViewState> {
  ADD_VISITED_VIEW(state: S, view: TagView): void;
  ADD_CACHED_VIEW(state: S, view: TagView): void;
  DEL_VISITED_VIEW(state: S, view: TagView): void;
  DEL_CACHED_VIEW(state: S, view: TagView): void;
  DEL_OTHERS_VISITED_VIEWS(state: S, view: TagView): void;
  DEL_OTHERS_CACHED_VIEWS(state: S, view: TagView): void;
  DEL_ALL_VISITED_VIEWS(state: S): void;
  DEL_ALL_CACHED_VIEWS(state: S): void;
  UPDATE_VISITED_VIEW(state: S, view: TagView): void;
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<TagsViewState, RootState>, "commit">;

export interface Actions {
  addView({ commit }: AugmentedActionContext, view: TagView): void;
  addVisitedView(
    { commit }: AugmentedActionContext,

    view: TagView
  ): void;
  delView(
    { commit }: AugmentedActionContext,

    view: TagView
  ): void;
  delCachedView(
    { commit }: AugmentedActionContext,

    view: TagView
  ): void;
  delOthersViews(
    { commit }: AugmentedActionContext,

    view: TagView
  ): void;

  delAllViews({ commit }: AugmentedActionContext): void;
  delAllCachedViews({ commit }: AugmentedActionContext): void;
  updateVisitedView({ commit }: AugmentedActionContext, view: TagView): void;
}

export default {
  state: {
    visitedViews: [],
    cachedViews: [],
  } as TagsViewState,
  mutations: {
    ADD_VISITED_VIEW(state: TagsViewState, view: TagView): void {
      if (state.visitedViews.some((v) => v.path === view.path)) return;
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || "no-name",
        })
      );
    },
    ADD_CACHED_VIEW(state: TagsViewState, view: TagView): void {
      if (view.name === null) return;
      if (state.cachedViews.includes(view.name as string)) return;
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name as string);
      }
    },
    DEL_VISITED_VIEW(state: TagsViewState, view: TagView): void {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }
    },
    DEL_CACHED_VIEW(state: TagsViewState, view: TagView): void {
      if (view.name === null) return;
      const index = state.cachedViews.indexOf(view.name as string);
      index > -1 && state.cachedViews.splice(index, 1);
    },
    DEL_OTHERS_VISITED_VIEWS(state: TagsViewState, view: TagView): void {
      state.visitedViews = state.visitedViews.filter((v) => {
        return v.meta.affix || v.path === view.path;
      });
    },
    DEL_OTHERS_CACHED_VIEWS(state: TagsViewState, view: TagView): void {
      if (view.name === null) return;
      const index = state.cachedViews.indexOf(view.name as string);
      if (index > -1) {
        state.cachedViews = state.cachedViews.slice(index, index + 1);
      } else {
        // if index = -1, there is no cached tags
        state.cachedViews = [];
      }
    },
    DEL_ALL_VISITED_VIEWS(state: TagsViewState): void {
      // keep affix tags
      const affixTags = state.visitedViews.filter((tag) => tag.meta.affix);
      state.visitedViews = affixTags;
    },
    DEL_ALL_CACHED_VIEWS(state: TagsViewState): void {
      state.cachedViews = [];
    },
    UPDATE_VISITED_VIEW(state: TagsViewState, view: TagView): void {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
  } as Mutations<TagsViewState>,
  actions: {
    addView({ commit }: AugmentedActionContext, view: TagView): void {
      commit("ADD_VISITED_VIEW", view);
      commit("ADD_CACHED_VIEW", view);
    },
    addVisitedView(
      { commit }: AugmentedActionContext,

      view: TagView
    ): void {
      commit("ADD_VISITED_VIEW", view);
    },
    delView(
      { commit }: AugmentedActionContext,

      view: TagView
    ): void {
      commit("DEL_VISITED_VIEW", view);
      commit("DEL_CACHED_VIEW", view);
    },
    delCachedView(
      { commit }: AugmentedActionContext,

      view: TagView
    ): void {
      commit("DEL_CACHED_VIEW", view);
    },

    delOthersViews({ commit }: AugmentedActionContext, view: TagView): void {
      commit("DEL_OTHERS_VISITED_VIEWS", view);
      commit("DEL_OTHERS_CACHED_VIEWS", view);
    },
    delAllViews({ commit }: AugmentedActionContext): void {
      commit("DEL_ALL_VISITED_VIEWS");
      commit("DEL_ALL_CACHED_VIEWS");
    },
    delAllCachedViews({ commit }: AugmentedActionContext): void {
      commit("DEL_ALL_CACHED_VIEWS");
    },
    updateVisitedView({ commit }: AugmentedActionContext, view: TagView): void {
      commit("UPDATE_VISITED_VIEW", view);
    },
  } as ActionTree<TagsViewState, RootState> & Actions,
};
