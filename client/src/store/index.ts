import { createStore } from "vuex";
import user, { UserState, UserStore } from "./modules/user";
import app, { AppState, AppStore } from "./modules/app";
import settings, { SettingsState, SettingsStore } from "./modules/settings";
import permission, {
  PermissionState,
  PermissionStore,
} from "./modules/permission";
import tagsView, { TagsViewState, TagsViewStore } from "./modules/tagsView";

export interface RootState {
  user: UserState;
  app: AppState;
  settings: SettingsState;
  permission: PermissionState;
  tagsView: TagsViewState;
}

export type Store = AppStore<Pick<RootState, "app">> &
  SettingsStore<Pick<RootState, "settings">> &
  UserStore<Pick<RootState, "user">> &
  PermissionStore<Pick<RootState, "permission">> &
  TagsViewStore<Pick<RootState, "tagsView">>;

const store = createStore({
  modules: {
    user,
    app,
    settings,
    permission,
    tagsView,
  } as any,
});

export default store;

export const useStore = (): Store => {
  return store as Store;
};
