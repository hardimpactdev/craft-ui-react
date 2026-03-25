import type { Plugin } from "vite-plus";
import type { CraftConfigOptions } from "./types.ts";

const VIRTUAL_MODULE_ID = "virtual:craft-i18n";
const RESOLVED_VIRTUAL_MODULE_ID = "\0" + VIRTUAL_MODULE_ID;

/**
 * The i18n runtime — a self-contained module.
 *
 * Exports:
 * - __()          — translate a key (plain function, works anywhere)
 * - setLocale()   — switch language + notify subscribers + persist
 * - getLocale()   — get current locale
 * - useLocale()   — React hook that re-renders on locale change
 * - initI18n()    — load translations (called automatically by the Vite plugin)
 */
const I18N_RUNTIME = `
import { useSyncExternalStore } from "react";

let locale = "en";
let fallbackLocale = "en";
const messages = {};
const listeners = new Set();

function notify() { listeners.forEach(fn => fn()); }

export function initI18n(options) {
    locale = options.locale ?? "en";
    fallbackLocale = options.fallbackLocale ?? "en";
    for (const [path, mod] of Object.entries(options.files)) {
        const match = path.match(/\\/([a-z]{2}(?:[-_][a-zA-Z]+)?)\\.json$/);
        if (!match) continue;
        const lang = match[1].replace("-", "_");
        const translations = "default" in mod ? mod.default : mod;
        messages[lang] = { ...(messages[lang] || {}), ...translations };
    }
}

export function setLocale(lang) {
    locale = lang;
    if (typeof localStorage !== "undefined") localStorage.setItem("locale", lang);
    if (typeof document !== "undefined") {
        document.cookie = "locale=" + lang + ";path=/;SameSite=Lax;max-age=31536000";
        document.documentElement.setAttribute("lang", lang.replace("_", "-"));
    }
    notify();
}

export function getLocale() { return locale; }

export function useLocale() {
    return useSyncExternalStore(
        (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
        () => locale,
        () => locale,
    );
}

export function __(key, replacements) {
    const msg = messages[locale]?.[key] ?? messages[fallbackLocale]?.[key] ?? key;
    if (!replacements) return msg;
    return Object.entries(replacements).reduce((result, [param, value]) => {
        const str = String(value);
        return result
            .replace(new RegExp(":" + param, "g"), str)
            .replace(new RegExp(":" + param.charAt(0).toUpperCase() + param.slice(1), "g"), str.charAt(0).toUpperCase() + str.slice(1))
            .replace(new RegExp(":" + param.toUpperCase(), "g"), str.toUpperCase());
    }, msg);
}
`;

/**
 * Vite plugin that provides craft i18n:
 * 1. A virtual module "virtual:craft-i18n" with __, setLocale, getLocale, useLocale, initI18n
 * 2. An alias so "@hardimpactdev/craft-ui-react/i18n" resolves to the virtual module
 * 3. Auto-injection of initI18n() into the app entry point
 */
export function craftI18nPlugin(
    i18n: NonNullable<CraftConfigOptions["i18n"]>,
): Plugin {
    const opts = typeof i18n === "object" ? i18n : {};
    const loc = opts.locale ?? "en";
    const fallback = opts.fallbackLocale ?? "en";
    const langPath = opts.langPath ?? "/lang/*.json";

    const initCode = `
import { initI18n } from "virtual:craft-i18n";
initI18n({
    locale: "${loc}",
    fallbackLocale: "${fallback}",
    files: import.meta.glob("${langPath}", { eager: true }),
});
`;

    return {
        name: "craft-i18n",
        enforce: "pre",

        config() {
            return {
                resolve: {
                    alias: {
                        "@hardimpactdev/craft-ui-react/i18n": VIRTUAL_MODULE_ID,
                    },
                },
            };
        },

        resolveId(id) {
            if (id === VIRTUAL_MODULE_ID || id === "@hardimpactdev/craft-ui-react/i18n") {
                return RESOLVED_VIRTUAL_MODULE_ID;
            }
        },

        load(id) {
            if (id === RESOLVED_VIRTUAL_MODULE_ID) {
                return I18N_RUNTIME;
            }
        },

        transform(code, id) {
            if (!id.match(/resources\/js\/app\.(tsx|ts|jsx|js)$/)) {
                return null;
            }
            return { code: initCode + code, map: null };
        },
    };
}
