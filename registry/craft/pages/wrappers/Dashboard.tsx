import { Head } from '@inertiajs/react';
import DashboardPage from '@/components/pages/dashboard';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <DashboardPage />
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
    ],
};
