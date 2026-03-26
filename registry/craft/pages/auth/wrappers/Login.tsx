import { Head, useForm, usePage } from '@inertiajs/react';
import LoginPage from '@/components/pages/auth/login';
import type { LoginForm } from '@/components/pages/auth/types';
import { store } from '@/routes/login';

export default function Login() {
    const { status, canResetPassword, canRegister } = usePage().props;
    const form = useForm<LoginForm>({ email: '', password: '', remember: false });

    return (
        <>
            <Head title="Log in" />
            <LoginPage
                status={status}
                canResetPassword={canResetPassword}
                canRegister={canRegister}
                errors={form.errors}
                processing={form.processing}
                onSubmit={(data) => form.transform(() => data).post(store.url())}
            />
        </>
    );
}

Login.layout = {
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
};
