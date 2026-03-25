import { useLaravelReactI18n } from "laravel-react-i18n";
export { LaravelReactI18nProvider } from "laravel-react-i18n";

/**
 * Laravel-style __() translation hook.
 *
 * @example
 * import { useTranslations } from '@hardimpactdev/craft-ui-react/i18n';
 *
 * function MyComponent() {
 *     const __ = useTranslations();
 *     return <p>{__('Welcome')}</p>;
 * }
 */
export function useTranslations() {
    const { t } = useLaravelReactI18n();
    return t;
}

/**
 * Pluralized translation hook.
 *
 * @example
 * const __choice = useTranslationChoice();
 * <p>{__choice('apples', count)}</p>
 */
export function useTranslationChoice() {
    const { tChoice } = useLaravelReactI18n();
    return tChoice;
}
