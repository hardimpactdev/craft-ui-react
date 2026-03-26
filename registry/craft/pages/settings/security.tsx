import { useState, type FormEvent } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TwoFactorSection from '@/components/two-factor-section';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { PasswordForm, SecurityPageProps } from './types';

export default function SecurityPage({
    user,
    passwordErrors = {},
    passwordProcessing = false,
    passwordRecentlySuccessful = false,
    onPasswordSubmit,
    canManageTwoFactor = false,
    twoFactorProps,
}: SecurityPageProps) {
    const [form, setForm] = useState<PasswordForm>({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onPasswordSubmit?.(form);
    };

    const twoFactorSectionProps = twoFactorProps ?? {
        enabled: false,
    };

    return (
        <div className="space-y-6">
            <Heading
                title="Security"
                description={`Update security settings for ${user.name}.`}
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="current_password">Current password</Label>
                    <PasswordInput
                        id="current_password"
                        autoComplete="current-password"
                        placeholder="Current password"
                        value={form.current_password}
                        onChange={(event) =>
                            setForm((current) => ({
                                ...current,
                                current_password: event.target.value,
                            }))
                        }
                    />
                    <InputError message={passwordErrors.current_password} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">New password</Label>
                    <PasswordInput
                        id="password"
                        autoComplete="new-password"
                        placeholder="New password"
                        value={form.password}
                        onChange={(event) =>
                            setForm((current) => ({ ...current, password: event.target.value }))
                        }
                    />
                    <InputError message={passwordErrors.password} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">Confirm password</Label>
                    <PasswordInput
                        id="password_confirmation"
                        autoComplete="new-password"
                        placeholder="Confirm password"
                        value={form.password_confirmation}
                        onChange={(event) =>
                            setForm((current) => ({
                                ...current,
                                password_confirmation: event.target.value,
                            }))
                        }
                    />
                    <InputError message={passwordErrors.password_confirmation} />
                </div>

                <div className="flex items-center gap-4">
                    <Button type="submit" disabled={passwordProcessing}>
                        Save password
                    </Button>
                    <p
                        className={cn(
                            'text-sm text-green-600 transition-opacity',
                            {
                                'opacity-100': passwordRecentlySuccessful,
                                'opacity-0': !passwordRecentlySuccessful,
                            },
                        )}
                    >
                        Saved.
                    </p>
                </div>
            </form>

            <Separator />

            {canManageTwoFactor ? (
                <TwoFactorSection
                    {...twoFactorSectionProps}
                    onEnable={twoFactorSectionProps.onEnable}
                    onConfirm={twoFactorSectionProps.onConfirm}
                />
            ) : null}
        </div>
    );
}
