import { Head } from '@inertiajs/react';
import AppearancePage from '@/components/pages/settings/appearance';

export default function Appearance() {
    return (
        <>
            <Head title="Appearance" />
            <AppearancePage />
        </>
    );
}

Appearance.layout = {
    breadcrumbs: [
        { title: 'Settings', href: '/settings/profile' },
        { title: 'Appearance', href: '/settings/appearance' },
    ],
};
