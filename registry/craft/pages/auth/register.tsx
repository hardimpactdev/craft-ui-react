import { LoaderCircle } from 'lucide-react';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import AuthLayout from '@/layouts/auth/auth-layout';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { RegisterForm, RegisterPageProps } from './types';

export default function RegisterPage({
    errors = {},
    processing = false,
    loginUrl = '/login',
    logo,
    logoLink,
    variant,
    name,
    onSubmit,
}: RegisterPageProps) {
    const [form, setForm] = useState<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit?.(form);
    };

    const handleInputChange =
        (field: keyof RegisterForm) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            setForm((current) => ({ ...current, [field]: event.target.value }));
        };

    return (
        <AuthLayout
            variant={variant}
            name={name}
            logo={logo}
            logoLink={logoLink}
            title="Create an account"
            description="Enter your details below to create your account"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={handleInputChange('name')}
                        required
                        autoFocus
                        autoComplete="name"
                        placeholder="Full name"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={handleInputChange('email')}
                        required
                        autoComplete="email"
                        placeholder="email@example.com"
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                        id="password"
                        value={form.password}
                        onChange={handleInputChange('password')}
                        required
                        autoComplete="new-password"
                        placeholder="Password"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">Confirm password</Label>
                    <PasswordInput
                        id="password_confirmation"
                        value={form.password_confirmation}
                        onChange={handleInputChange('password_confirmation')}
                        required
                        autoComplete="new-password"
                        placeholder="Confirm password"
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                <Button
                    type="submit"
                    className="mt-2 w-full"
                    disabled={processing}
                >
                    {processing && <LoaderCircle className="mr-2 size-4 animate-spin" />}
                    Create account
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <TextLink href={loginUrl}>Log in</TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
