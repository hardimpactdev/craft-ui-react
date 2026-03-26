import { Head, useForm } from '@inertiajs/react';
import RegisterPage from '@/components/pages/auth/register';
import type { RegisterForm } from '@/components/pages/auth/types';
import { store } from '@/routes/register';

export default function Register() {
    const form = useForm<RegisterForm>({ name: '', email: '', password: '', password_confirmation: '' });

    return (
        <>
            <Head title="Register" />
            <RegisterPage
                errors={form.errors}
                processing={form.processing}
                onSubmit={(data) => form.transform(() => data).post(store.url())}
            />
        </>
    );
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details below to create your account',
};
