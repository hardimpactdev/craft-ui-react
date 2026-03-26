import { LoaderCircle } from 'lucide-react';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import AuthLayout from '@/layouts/auth/auth-layout';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ResetPasswordForm, ResetPasswordPageProps } from './types';

export default function ResetPasswordPage({
    token,
    email,
    errors = {},
    processing = false,
    logo,
    logoLink,
    variant,
    name,
    onSubmit,
    loginUrl = '/login',
}: ResetPasswordPageProps) {
    const [form, setForm] = useState<ResetPasswordForm>({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit?.(form);
    };

    const handlePasswordChange =
        (field: keyof Omit<ResetPasswordForm, 'token' | 'email'>) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            setForm((current) => ({ ...current, [field]: event.target.value }));
        };

    return (
        <AuthLayout
            variant={variant}
            name={name}
            logo={logo}
            logoLink={logoLink}
            title="Reset password"
            description="Choose a new password for your account"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input type="hidden" value={form.token} />
                <input type="hidden" value={form.email} />

                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={form.email} readOnly autoFocus />
                    <InputError message={errors.email} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                        id="password"
                        value={form.password}
                        onChange={handlePasswordChange('password')}
                        required
                        autoComplete="new-password"
                        placeholder="New password"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">Confirm password</Label>
                    <PasswordInput
                        id="password_confirmation"
                        value={form.password_confirmation}
                        onChange={handlePasswordChange('password_confirmation')}
                        required
                        autoComplete="new-password"
                        placeholder="Confirm password"
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                <Button type="submit" className="w-full" disabled={processing}>
                    {processing && <LoaderCircle className="mr-2 size-4 animate-spin" />}
                    Reset password
                </Button>

                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <TextLink href={loginUrl}>Back to login</TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
