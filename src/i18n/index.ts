/**
 * Lightweight i18n for Laravel + React apps.
 *
 * Loads JSON translation files from /lang/*.json (Laravel convention).
 * Provides __() as a plain function — no React hooks, no providers needed.
 *
 * @example
 * import { __ } from '@hardimpactdev/craft-ui-react/i18n';
 *
 * __('Welcome')                              // "Welcome"
 * __('Hello :name', { name: 'Nick' })        // "Hello Nick"
 * __('Hello :Name', { name: 'nick' })        // "Hello Nick" (ucfirst)
 * __('Hello :NAME', { name: 'nick' })        // "Hello NICK" (upper)
 */

type Translations = Record<string, string>;
type Replacements = Record<string, string | number>;

let locale = "en";
let fallbackLocale = "en";
const messages: Record<string, Translations> = {};

/**
 * Initialize the i18n store. Called by the Vite plugin at app startup.
 */
export function initI18n(options: {
    locale?: string;
    fallbackLocale?: string;
    files: Record<string, { default: Translations } | Translations>;
}) {
    locale = options.locale ?? "en";
    fallbackLocale = options.fallbackLocale ?? "en";

    for (const [path, module] of Object.entries(options.files)) {
        // Extract locale from path: /lang/en.json -> "en"
        const match = path.match(/\/([a-z]{2}(?:[-_][a-zA-Z]+)?)\.json$/);
        if (!match) continue;

        const lang = match[1].replace("-", "_");
        const translations =
            "default" in (module as object)
                ? (module as { default: Translations }).default
                : (module as Translations);

        messages[lang] = { ...(messages[lang] || {}), ...translations };
    }
}

/**
 * Set the active locale at runtime.
 */
export function setLocale(lang: string) {
    locale = lang;
}

/**
 * Get the active locale.
 */
export function getLocale(): string {
    return locale;
}

/**
 * Translate a key, matching Laravel's __() helper.
 *
 * Supports :placeholder, :Placeholder (ucfirst), and :PLACEHOLDER (upper) replacements.
 */
export function __(key: string, replacements?: Replacements): string {
    const msg =
        messages[locale]?.[key] ??
        messages[fallbackLocale]?.[key] ??
        key;

    if (!replacements) return msg;

    return Object.entries(replacements).reduce((result, [param, value]) => {
        const str = String(value);
        return result
            .replace(new RegExp(`:${param}`, "g"), str)
            .replace(
                new RegExp(`:${param.charAt(0).toUpperCase() + param.slice(1)}`, "g"),
                str.charAt(0).toUpperCase() + str.slice(1),
            )
            .replace(
                new RegExp(`:${param.toUpperCase()}`, "g"),
                str.toUpperCase(),
            );
    }, msg);
}
