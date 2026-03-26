import { Head, useForm } from '@inertiajs/react';
import ConfirmPasswordPage from '@/components/pages/auth/confirm-password';
import type { ConfirmPasswordForm } from '@/components/pages/auth/types';
import { store } from '@/routes/password.confirm';

export default function ConfirmPassword() {
    const form = useForm<ConfirmPasswordForm>({ password: '' });

    return (
        <>
            <Head title="Confirm Password" />
            <ConfirmPasswordPage
                errors={form.errors}
                processing={form.processing}
                onSubmit={(data) => form.transform(() => data).post(store.url())}
            />
        </>
    );
}

ConfirmPassword.layout = {
    title: 'Confirm your password',
    description: 'Please confirm your password before continuing',
};
