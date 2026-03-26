import { Head, usePage, router } from '@inertiajs/react';
import VerifyEmailPage from '@/components/pages/auth/verify-email';
import { send } from '../../routes/verification';
import { logout } from '../../routes';

export default function VerifyEmail() {
    const { status } = usePage().props;

    return (
        <>
            <Head title="Verify Email" />
            <VerifyEmailPage
                status={status}
                onResend={() => router.post(send.url())}
                onLogout={() => router.post(logout.url())}
            />
        </>
    );
}

VerifyEmail.layout = {
    title: 'Verify your email',
    description: 'Check your inbox for a verification link',
};
