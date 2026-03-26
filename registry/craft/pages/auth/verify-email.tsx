import { LoaderCircle } from 'lucide-react';
import AuthLayout from '@/layouts/auth/auth-layout';
import { Button } from '@/components/ui/button';
import TextLink from '@/components/text-link';
import type { VerifyEmailPageProps } from './types';

export default function VerifyEmailPage({
    status,
    processing = false,
    logo,
    logoLink,
    variant,
    name,
    onResend,
    onLogout,
}: VerifyEmailPageProps) {
    return (
        <AuthLayout
            variant={variant}
            name={name}
            logo={logo}
            logoLink={logoLink}
            title="Email verification"
            description="Verify your email address to continue"
        >
            <div className="space-y-6 text-center">
                {status && (
                    <p className="text-sm font-medium text-green-600">{status}</p>
                )}

                <p className="text-sm text-muted-foreground">
                    Thanks for signing up. Before continuing, please verify your email address by
                    clicking the link in the message we sent you.
                </p>

                <Button
                    type="button"
                    className="w-full"
                    onClick={onResend}
                    disabled={processing}
                >
                    {processing && <LoaderCircle className="mr-2 size-4 animate-spin" />}
                    Resend verification email
                </Button>

                <TextLink href="/logout" onClick={onLogout}>
                    Log out
                </TextLink>
            </div>
        </AuthLayout>
    );
}
