import React from 'react';

// Mock InertiaLinkProps type
export type InertiaLinkProps = {
    href: string | { url: string; method?: string };
    method?: string;
    data?: Record<string, any>;
    replace?: boolean;
    preserveScroll?: boolean;
    preserveState?: boolean;
    only?: string[];
    headers?: Record<string, string>;
    as?: string;
    prefetch?: boolean | string;
    className?: string;
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent) => void;
};

// Mock Link component
export function Link({ href, children, className, prefetch, ...props }: any) {
    const resolvedHref = typeof href === 'string' ? href : href?.url || '#';
    return React.createElement(
        'a',
        {
            href: resolvedHref,
            className,
            onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                console.log(`[Mock Inertia Link] Navigate to: ${resolvedHref}`);
            },
            ...props,
        },
        children,
    );
}

// Mock Head component
export function Head({ title, children }: { title?: string; children?: React.ReactNode }) {
    return null;
}

// Mock usePage
const defaultPageProps = {
    auth: {
        user: {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            avatar: undefined,
            email_verified_at: '2024-01-01T00:00:00.000Z',
            created_at: '2024-01-01T00:00:00.000Z',
            updated_at: '2024-01-01T00:00:00.000Z',
            permissions: ['view-dashboard', 'manage-settings'],
        },
    },
    location: { current: '/dashboard', previous: '/' },
    sidebarOpen: true,
    name: 'Craft App',
};

export function usePage() {
    return {
        props: defaultPageProps,
        url: '/dashboard',
        component: 'Dashboard',
        version: '1.0.0',
    };
}

// Mock router
export const router = {
    visit: (...args: any[]) => console.log('[Mock router] visit', args),
    get: (...args: any[]) => console.log('[Mock router] get', args),
    post: (...args: any[]) => console.log('[Mock router] post', args),
    put: (...args: any[]) => console.log('[Mock router] put', args),
    patch: (...args: any[]) => console.log('[Mock router] patch', args),
    delete: (...args: any[]) => console.log('[Mock router] delete', args),
    reload: (...args: any[]) => console.log('[Mock router] reload', args),
    on: () => () => {},
    flushAll: () => {},
};

// Mock useForm
export function useForm(initialValues: any = {}) {
    return {
        data: initialValues,
        setData: () => {},
        post: () => {},
        put: () => {},
        patch: () => {},
        delete: () => {},
        processing: false,
        errors: {},
        reset: () => {},
        clearErrors: () => {},
        isDirty: false,
        hasErrors: false,
    };
}
