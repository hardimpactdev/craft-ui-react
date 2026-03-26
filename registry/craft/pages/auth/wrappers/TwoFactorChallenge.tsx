import { Head, useForm } from '@inertiajs/react';
import TwoFactorChallengePage from '@/components/pages/auth/two-factor-challenge';
import type { TwoFactorForm, TwoFactorRecoveryForm } from '@/components/pages/auth/types';
import { store } from '@/routes/two-factor.login';

export default function TwoFactorChallenge() {
    const codeForm = useForm<TwoFactorForm>({ code: '' });
    const recoveryForm = useForm<TwoFactorRecoveryForm>({ recovery_code: '' });

    return (
        <>
            <Head title="Two-Factor Challenge" />
            <TwoFactorChallengePage
                errors={{ ...codeForm.errors, ...recoveryForm.errors }}
                processing={codeForm.processing || recoveryForm.processing}
                onSubmit={(data) => codeForm.transform(() => data).post(store.url())}
                onRecoverySubmit={(data) => recoveryForm.transform(() => data).post(store.url())}
            />
        </>
    );
}

TwoFactorChallenge.layout = {
    title: 'Two-factor authentication',
    description: 'Enter your authentication code to continue',
};
