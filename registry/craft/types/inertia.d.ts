import type { Config } from '@inertiajs/core';

declare module '@inertiajs/core' {
    interface InertiaConfig extends Config {
        sharedPageProps: {
            name: string;
            auth: {
                user: {
                    id: number;
                    name: string;
                    email: string;
                    avatar?: string;
                    email_verified_at: string | null;
                    two_factor_enabled?: boolean;
                };
            };
            sidebarOpen: boolean;
            app: { name: string; timezone: string; locale: string };
            location: { current: string; previous: string | null };
        };
    }
}
