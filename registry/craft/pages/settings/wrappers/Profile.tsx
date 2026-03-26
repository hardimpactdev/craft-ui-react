import { Head, useForm, usePage, router } from '@inertiajs/react';
import ProfilePage from '@/components/pages/settings/profile';
import type { ProfileForm } from '@/components/pages/settings/types';
import { update, destroy } from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { send } from '@/routes/verification';

export default function Profile() {
    const { auth, mustVerifyEmail, status } = usePage().props;
    const profileForm = useForm<ProfileForm>({ name: auth.user.name, email: auth.user.email });
    const deleteForm = useForm({ password: '' });

    return (
        <>
            <Head title="Profile" />
            <ProfilePage
                user={auth.user}
                mustVerifyEmail={mustVerifyEmail}
                status={status}
                errors={profileForm.errors}
                processing={profileForm.processing}
                recentlySuccessful={profileForm.recentlySuccessful}
                onSubmit={(data) => profileForm.transform(() => data).patch(update.url(), { preserveScroll: true })}
                onResendVerification={() => router.post(send.url())}
                deleteErrors={deleteForm.errors}
                deleteProcessing={deleteForm.processing}
                onDelete={(password) => deleteForm.transform(() => ({ password })).delete(destroy.url())}
            />
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        { title: 'Settings', href: '/settings/profile' },
        { title: 'Profile', href: '/settings/profile' },
    ],
};
