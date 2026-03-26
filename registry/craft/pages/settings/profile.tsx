import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import DeleteUser from '@/components/delete-user';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { ProfileForm, ProfilePageProps } from './types';

export default function ProfilePage({
    user,
    status,
    errors = {},
    processing = false,
    recentlySuccessful = false,
    mustVerifyEmail = false,
    onSubmit,
    onResendVerification,
    deleteErrors,
    deleteProcessing = false,
    onDelete,
    title = 'Profile',
    description = 'Update your profile information and email address.',
}: ProfilePageProps) {
    const [form, setForm] = useState<ProfileForm>({
        name: user.name,
        email: user.email,
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit?.(form);
    };

    return (
        <div className="space-y-6">
            <Heading title={title} description={description} />

            {status && <p className="text-sm text-green-600">{status}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        value={form.name}
                        onChange={(event) =>
                            setForm((current) => ({ ...current, name: event.target.value }))
                        }
                        autoComplete="name"
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(event) =>
                            setForm((current) => ({ ...current, email: event.target.value }))
                        }
                        autoComplete="email"
                    />
                    <InputError message={errors.email} />
                </div>

                <div className={cn('text-sm text-green-600 transition-opacity', {
                    'opacity-100': recentlySuccessful,
                    'opacity-0': !recentlySuccessful,
                })}>
                    Saved.
                </div>

                <Button type="submit" className="w-full" disabled={processing}>
                    {processing && <LoaderCircle className="mr-2 size-4 animate-spin" />}
                    Save
                </Button>
            </form>

            {mustVerifyEmail && !user.email_verified_at && (
                <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Your email address is not verified.</p>
                    <TextLink href="#" onClick={onResendVerification}>
                        Resend verification email
                    </TextLink>
                </div>
            )}

            <Separator />

            <DeleteUser errors={deleteErrors} processing={deleteProcessing} onDelete={onDelete} />
        </div>
    );
}
