import { Head, useForm, usePage } from '@inertiajs/react';
import SecurityPage from '@/components/pages/settings/security';
import type { PasswordForm } from '@/components/pages/settings/types';
import { update } from '@/actions/App/Http/Controllers/Settings/SecurityController';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';

export default function Security() {
    const { auth, twoFactorEnabled, canManageTwoFactor } = usePage().props;
    const passwordForm = useForm<PasswordForm>({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const twoFactor = useTwoFactorAuth();

    return (
        <>
            <Head title="Security" />
            <SecurityPage
                user={auth.user}
                passwordErrors={passwordForm.errors}
                passwordProcessing={passwordForm.processing}
                passwordRecentlySuccessful={passwordForm.recentlySuccessful}
                onPasswordSubmit={(data) =>
                    passwordForm.transform(() => data).put(update.url(), {
                        preserveScroll: true,
                    })
                }
                canManageTwoFactor={canManageTwoFactor}
                twoFactorProps={{
                    enabled: twoFactorEnabled,
                    qrCodeSvg: twoFactor.qrCodeSvg,
                    manualSetupKey: twoFactor.manualSetupKey,
                    recoveryCodes: twoFactor.recoveryCodesList,
                    errors: twoFactor.errors,
                    processing: false,
                    onEnable: () => twoFactor.fetchSetupData(),
                    onConfirm: (code) => { /* confirm 2FA with code */ },
                    onDisable: () => { /* disable 2FA */ },
                    onRegenerateCodes: () => twoFactor.fetchRecoveryCodes(),
                    onFetchRecoveryCodes: () => twoFactor.fetchRecoveryCodes(),
                    onFetchSetupData: () => twoFactor.fetchSetupData(),
                }}
            />
        </>
    );
}

Security.layout = {
    breadcrumbs: [
        { title: 'Settings', href: '/settings/profile' },
        { title: 'Security', href: '/settings/security' },
    ],
};
