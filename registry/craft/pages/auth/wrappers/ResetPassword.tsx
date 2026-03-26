import { Head, useForm, usePage } from '@inertiajs/react';
import ResetPasswordPage from '@/components/pages/auth/reset-password';
import type { ResetPasswordForm } from '@/components/pages/auth/types';
import { store } from '@/routes/password.update';

export default function ResetPassword() {
    const { token, email } = usePage().props;
    const form = useForm<ResetPasswordForm>({ token, email, password: '', password_confirmation: '' });

    return (
        <>
            <Head title="Reset Password" />
            <ResetPasswordPage
                token={token}
                email={email}
                errors={form.errors}
                processing={form.processing}
                onSubmit={(data) => form.transform(() => data).post(store.url())}
            />
        </>
    );
}

ResetPassword.layout = {
    title: 'Reset your password',
    description: 'Enter your new password below',
};
