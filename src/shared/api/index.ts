import axios from "axios";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { Locale } from "../types";

const getLangFromHostPath = (): Locale => {
  if (typeof window === "undefined") return "ru";
  const first = window.location.pathname.split("/").filter(Boolean)[0];
  return first === "kg" ? "kg" : "ru";
};

const LANG_WHITELIST_PREFIXES = [
  "/dictionaries/regions",
  "/dictionaries/organizations",
  "/dictionaries/organization-types",
  "/dictionaries/districts",
];

const shouldAppendLang = (url: string) => {
  const path = url.split("?")[0];
  if (/(?:\/ru|\/kg)$/.test(path)) return false;
  return LANG_WHITELIST_PREFIXES.some((p) => path.startsWith(p));
};

const appendLangToUrl = (url: string, lang: Locale) => {
  const [path, query] = url.split("?");
  const nextPath = `${path.replace(/\/$/, "")}/${lang}`;
  return query ? `${nextPath}?${query}` : nextPath;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15_000,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.url) {
    const lang = getLangFromHostPath();
    const isAbsolute = /^https?:\/\//i.test(config.url);
    if (!isAbsolute && shouldAppendLang(config.url)) {
      config.url = appendLangToUrl(config.url, lang);
    }
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response.status;

    if (status === 403) {
      useAuthStore.getState().logout();

      if (typeof window !== "undefined") {
        window.location.href = "/auth/sign-in";
      }
    }

    return Promise.reject(error);
  }
);
