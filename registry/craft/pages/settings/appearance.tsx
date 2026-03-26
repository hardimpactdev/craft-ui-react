import { type ReactNode } from 'react';
import AppearanceTabs from '@/components/appearance-tabs';
import Heading from '@/components/heading';
import type { AppearancePageProps } from './types';

export default function AppearancePage({
    title = 'Appearance',
    description = 'Update your account\'s appearance settings.',
    children,
}: AppearancePageProps & { children?: ReactNode }) {
    return (
        <div className="space-y-6">
            <Heading title={title} description={description} />
            {children ?? <AppearanceTabs />}
        </div>
    );
}
