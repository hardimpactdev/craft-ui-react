import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

type AuthCardLayoutProps = {
    name?: string;
    title?: string;
    description?: string;
    logo?: ReactNode;
    logoLink?: string;
    children?: React.ReactNode;
};

export default function AuthCardLayout({
    children,
    title,
    description,
    logo,
    logoLink = '/',
}: AuthCardLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-6">
                <Link
                    href={logoLink}
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <div className="flex h-9 w-9 items-center justify-center">
                        {logo ?? (
                            <AppLogoIcon className="size-9 fill-current text-black dark:text-white" />
                        )}
                    </div>
                </Link>

                <div className="flex flex-col gap-6">
                    <Card className="rounded-xl">
                        <CardHeader className="px-10 pt-8 pb-0 text-center">
                            <CardTitle className="text-xl">{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </CardHeader>
                        <CardContent className="px-10 py-8">
                            {children}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
