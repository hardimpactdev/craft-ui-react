import { LoaderCircle } from 'lucide-react';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import AuthLayout from '@/layouts/auth/auth-layout';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type { ConfirmPasswordForm, ConfirmPasswordPageProps } from './types';

export default function ConfirmPasswordPage({
    errors = {},
    processing = false,
    logo,
    logoLink,
    variant,
    name,
    onSubmit,
}: ConfirmPasswordPageProps) {
    const [form, setForm] = useState<ConfirmPasswordForm>({
        password: '',
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit?.(form);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({ password: event.target.value });
    };

    return (
        <AuthLayout
            variant={variant}
            name={name}
            logo={logo}
            logoLink={logoLink}
            title="Confirm password"
            description="Please confirm your password to continue"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                        id="password"
                        value={form.password}
                        onChange={handlePasswordChange}
                        required
                        autoComplete="current-password"
                        placeholder="Current password"
                    />
                    <InputError message={errors.password} />
                </div>

                <Button type="submit" className="w-full" disabled={processing}>
                    {processing && <LoaderCircle className="mr-2 size-4 animate-spin" />}
                    Confirm
                </Button>
            </form>
        </AuthLayout>
    );
}
