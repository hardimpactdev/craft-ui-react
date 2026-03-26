import AuthCardLayout from '@/layouts/auth/auth-card-layout';
import AuthSimpleLayout from '@/layouts/auth/auth-simple-layout';
import AuthSplitLayout from '@/layouts/auth/auth-split-layout';
import type { ComponentType, ReactNode } from 'react';
import type { AuthLayoutProps, AuthLayoutVariant } from '@/lib/types';

type AuthLayoutBlockProps = AuthLayoutProps & {
    title: string;
    description: string;
    children: ReactNode;
    variant?: AuthLayoutVariant;
};

const layouts: Record<AuthLayoutVariant, ComponentType<AuthLayoutProps>> = {
    simple: AuthSimpleLayout,
    split: AuthSplitLayout,
    card: AuthCardLayout,
};

export default function AuthLayout({
    variant = 'simple',
    title,
    description,
    children,
    ...props
}: AuthLayoutBlockProps) {
    const Layout = layouts[variant];

    return (
        <Layout title={title} description={description} {...props}>
            {children}
        </Layout>
    );
}
