import { useLaravelReactI18n } from "laravel-react-i18n";
export { LaravelReactI18nProvider } from "laravel-react-i18n";

/**
 * Translation hook matching Laravel's __() helper.
 *
 * @example
 * import { useTranslation } from '@hardimpactdev/craft-ui-react/i18n';
 *
 * function MyComponent() {
 *     const { __ } = useTranslation();
 *     return <p>{__('Welcome')}</p>;
 * }
 */
export function useTranslation() {
    const { t, tChoice, ...rest } = useLaravelReactI18n();
    return { __: t, __choice: tChoice, ...rest };
}
