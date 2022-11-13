import Cookies from "js-cookie";

// App
const sidebarStatusKey = "sidebar_status";
export const getSidebarStatus = (): any => Cookies.get(sidebarStatusKey);
export const setSidebarStatus = (sidebarStatus: string): void =>
  Cookies.set(sidebarStatusKey, sidebarStatus);

const languageKey = "language";
export const getLanguage = (): any => Cookies.get(languageKey);
export const setLanguage = (language: string): void =>
  Cookies.set(languageKey, language);

const sizeKey = "size";
export const getSize = (): any => Cookies.get(sizeKey);
export const setSize = (size: string): void => Cookies.set(sizeKey, size);

// User
const tokenKey = "vue_typescript_admin_access_token";
export const getToken = (): any => Cookies.get(tokenKey);
export const setToken = (token: string): void => Cookies.set(tokenKey, token);
export const removeToken = (): any => Cookies.remove(tokenKey);
