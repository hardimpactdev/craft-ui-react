import { useLaravelReactI18n } from "laravel-react-i18n";

/**
 * Translation hook matching Laravel's __() helper.
 *
 * @example
 * const { __ } = useTranslation();
 * <p>{__('Welcome')}</p>
 * <p>{__('Hello :name', { name: 'Nick' })}</p>
 */
export function useTranslation() {
    const { t, tChoice, ...rest } = useLaravelReactI18n();
    return { __: t, __choice: tChoice, ...rest };
}
