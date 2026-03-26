import { Head, useForm, usePage } from '@inertiajs/react';
import ForgotPasswordPage from '@/components/pages/auth/forgot-password';
import type { ForgotPasswordForm } from '@/components/pages/auth/types';
import { store } from '@/routes/password.email';

export default function ForgotPassword() {
    const { status } = usePage().props;
    const form = useForm<ForgotPasswordForm>({ email: '' });

    return (
        <>
            <Head title="Forgot Password" />
            <ForgotPasswordPage
                status={status}
                errors={form.errors}
                processing={form.processing}
                onSubmit={(data) => form.transform(() => data).post(store.url())}
            />
        </>
    );
}

ForgotPassword.layout = {
    title: 'Forgot your password?',
    description: 'Enter your email to receive a password reset link',
};
