import { LoaderCircle, KeyRound } from 'lucide-react';
import {
    type ChangeEvent,
    type FormEvent,
    type KeyboardEvent,
    useState,
} from 'react';
import AuthLayout from '@/layouts/auth/auth-layout';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { LoginForm, LoginPageProps } from './types';

export default function LoginPage({
    status,
    errors = {},
    processing = false,
    canResetPassword = true,
    canRegister = true,
    forgotPasswordUrl = '/forgot-password',
    registerUrl = '/register',
    logo,
    logoLink,
    variant,
    name,
    onSubmit,
    passkeysEnabled = false,
    onPasskeyLogin,
}: LoginPageProps) {
    const [form, setForm] = useState<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit?.(form);
    };

    const handleInputChange =
        (field: keyof Omit<LoginForm, 'remember'>) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            setForm((current) => ({ ...current, [field]: event.target.value }));
        };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && canResetPassword) {
            event.currentTarget.blur();
        }
    };

    return (
        <AuthLayout
            variant={variant}
            name={name}
            logo={logo}
            logoLink={logoLink}
            title="Log in to your account"
            description="Enter your email and password below to log in"
        >
            <div className="space-y-6">
                {status && (
                    <div className="text-center text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                {passkeysEnabled && (
                    <div className="space-y-4">
                        <Button
                            variant="outline"
                            type="button"
                            className="w-full"
                            onClick={() => onPasskeyLogin?.()}
                        >
                            <KeyRound className="mr-2 size-4" />
                            Sign in with passkey
                        </Button>

                        <div className="flex items-center gap-2">
                            <Separator className="flex-1" />
                            <span className="text-xs text-muted-foreground">
                                or
                            </span>
                            <Separator className="flex-1" />
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={form.email}
                                onChange={handleInputChange('email')}
                                onKeyDown={handleKeyPress}
                                required
                                autoFocus
                                autoComplete="email"
                                placeholder="email@example.com"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                {canResetPassword && (
                                    <TextLink
                                        href={forgotPasswordUrl}
                                        className="ml-auto text-sm"
                                    >
                                        Forgot password?
                                    </TextLink>
                                )}
                            </div>

                            <PasswordInput
                                id="password"
                                value={form.password}
                                onChange={handleInputChange('password')}
                                required
                                autoComplete="current-password"
                                placeholder="Password"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="remember"
                                checked={form.remember}
                                onCheckedChange={(checked) =>
                                    setForm((current) => ({
                                        ...current,
                                        remember: Boolean(checked),
                                    }))
                                }
                            />
                            <Label htmlFor="remember">Remember me</Label>
                        </div>

                        <Button
                            type="submit"
                            className="mt-4 w-full"
                            disabled={processing}
                        >
                            {processing && (
                                <LoaderCircle className="mr-2 size-4 animate-spin" />
                            )}
                            Log in
                        </Button>
                    </div>

                    {canRegister && (
                        <div className="text-center text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <TextLink href={registerUrl}>Sign up</TextLink>
                        </div>
                    )}
                </form>
            </div>
        </AuthLayout>
    );
}
