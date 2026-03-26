import { LoaderCircle } from 'lucide-react';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import AuthLayout from '@/layouts/auth/auth-layout';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ForgotPasswordForm, ForgotPasswordPageProps } from './types';

export default function ForgotPasswordPage({
    status,
    errors = {},
    processing = false,
    loginUrl = '/login',
    logo,
    logoLink,
    variant,
    name,
    onSubmit,
}: ForgotPasswordPageProps) {
    const [form, setForm] = useState<ForgotPasswordForm>({
        email: '',
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit?.(form);
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm((current) => ({ ...current, email: event.target.value }));
    };

    return (
        <AuthLayout
            variant={variant}
            name={name}
            logo={logo}
            logoLink={logoLink}
            title="Forgot password"
            description="Enter your email to receive a password reset link"
        >
            <div className="space-y-6">
                {status && (
                    <div className="text-center text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={handleEmailChange}
                            autoComplete="off"
                            autoFocus
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        {processing && (
                            <LoaderCircle className="mr-2 size-4 animate-spin" />
                        )}
                        Email password reset link
                    </Button>
                </form>

                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <span>Or, return to</span>
                    <TextLink href={loginUrl}>log in</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
