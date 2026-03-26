import { LoaderCircle, RotateCcw } from 'lucide-react';
import { FormEvent, useState } from 'react';
import AuthLayout from '@/layouts/auth/auth-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from '@/components/ui/input-otp';
import type { TwoFactorChallengePageProps, TwoFactorForm } from './types';

export default function TwoFactorChallengePage({
    errors = {},
    processing = false,
    logo,
    logoLink,
    variant,
    name,
    onSubmit,
    onRecoverySubmit,
}: TwoFactorChallengePageProps) {
    const [useRecoveryCode, setUseRecoveryCode] = useState(false);
    const [form, setForm] = useState<TwoFactorForm>({ code: '' });
    const [recoveryCode, setRecoveryCode] = useState('');

    const title = 'Two-factor authentication';
    const description = useRecoveryCode
        ? 'Enter one of your recovery codes to authenticate.'
        : 'Enter the 6-digit authentication code from your authenticator app.';

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (useRecoveryCode) {
            onRecoverySubmit?.({ recovery_code: recoveryCode });
            return;
        }

        onSubmit?.(form);
    };

    return (
        <AuthLayout
            variant={variant}
            name={name}
            logo={logo}
            logoLink={logoLink}
            title={title}
            description={description}
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {useRecoveryCode ? (
                    <div className="grid gap-2">
                        <label htmlFor="recovery_code" className="text-sm">
                            Recovery code
                        </label>
                        <Input
                            id="recovery_code"
                            value={recoveryCode}
                            onChange={(event) => setRecoveryCode(event.target.value)}
                            autoComplete="one-time-code"
                            placeholder="Enter recovery code"
                            required
                        />
                        <InputError message={errors.recovery_code} />
                    </div>
                ) : (
                    <div className="grid gap-2">
                        <label htmlFor="code" className="text-sm">
                            Authentication code
                        </label>
                        <InputOTP
                            id="code"
                            maxLength={6}
                            value={form.code}
                            onChange={(value) => setForm({ code: value })}
                            disabled={processing}
                            autoComplete="one-time-code"
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSeparator />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <InputError message={errors.code} />
                    </div>
                )}

                <Button type="submit" className="w-full" disabled={processing}>
                    {processing && <LoaderCircle className="mr-2 size-4 animate-spin" />}
                    Log in
                </Button>

                <button
                    type="button"
                    onClick={() => setUseRecoveryCode((value) => (value ? false : true))}
                    className="text-sm text-muted-foreground underline underline-offset-4"
                >
                    {useRecoveryCode ? (
                        <span className="inline-flex items-center gap-2">
                            <RotateCcw className="size-4" />
                            Use an authentication code
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-2">
                            <RotateCcw className="size-4" />
                            Use a recovery code
                        </span>
                    )}
                </button>
            </form>
        </AuthLayout>
    );
}
