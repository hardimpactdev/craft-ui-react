import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useCallback, useState } from 'react';
import SettingsLayout from '../../storybook-utils/components/settings-layout';
import AppearancePage from '../../storybook-utils/pages/settings/appearance';
import ProfilePage from '../../storybook-utils/pages/settings/profile';
import SecurityPage from '../../storybook-utils/pages/settings/security';
import type { TwoFactorSectionProps } from '../../storybook-utils/pages/settings/types';
import type { PasswordForm, ProfileForm } from '../../storybook-utils/pages/settings/types';

const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: undefined,
    email_verified_at: null,
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-01-01T00:00:00.000Z',
};

const meta: Meta = {
    title: 'Pages/Settings/SettingsPages',
};

export default meta;
type Story = StoryObj;

const withLayout = (children: ReactNode) => <SettingsLayout>{children}</SettingsLayout>;

export const ProfileDefault: Story = {
    render: () =>
        withLayout(
            <ProfilePage
                user={mockUser}
                onSubmit={(form: ProfileForm) =>
                    console.log('[Settings Story] profile', form)
                }
            />,
        ),
};

export const ProfileWithErrors: Story = {
    render: () =>
        withLayout(
            <ProfilePage
                user={mockUser}
                status="Profile save failed."
                errors={{
                    name: 'Name is required.',
                    email: 'Invalid email.',
                }}
                onSubmit={(form: ProfileForm) =>
                    console.log('[Settings Story] profile', form)
                }
            />,
        ),
};

export const ProfileRecentlySuccessful: Story = {
    render: () =>
        withLayout(
            <ProfilePage
                user={mockUser}
                recentlySuccessful
                onSubmit={(form: ProfileForm) =>
                    console.log('[Settings Story] profile', form)
                }
            />,
        ),
};

export const ProfileUnverifiedEmail: Story = {
    render: () =>
        withLayout(
            <ProfilePage
                user={{ ...mockUser, email_verified_at: null }}
                mustVerifyEmail
                onResendVerification={() =>
                    console.log('[Settings Story] resend verification')
                }
                onSubmit={(form: ProfileForm) =>
                    console.log('[Settings Story] profile', form)
                }
            />,
        ),
};

export const SecurityDefault: Story = {
    render: () =>
        withLayout(
            <SecurityPage
                user={mockUser}
                canManageTwoFactor
                twoFactorProps={{
                    enabled: false,
                    manualSetupKey: 'ABCD EF12 3456 7890',
                }}
                onPasswordSubmit={(form: PasswordForm) =>
                    console.log('[Settings Story] security', form)
                }
            />,
        ),
};

export const SecurityPasswordErrors: Story = {
    render: () =>
        withLayout(
            <SecurityPage
                user={mockUser}
                canManageTwoFactor={false}
                passwordErrors={{
                    current_password: 'Current password is incorrect.',
                    password: 'Password is too short.',
                    password_confirmation: 'Passwords do not match.',
                }}
                onPasswordSubmit={(form: PasswordForm) =>
                    console.log('[Settings Story] security', form)
                }
            />,
        ),
};

export const SecurityTwoFactorEnabled: Story = {
    render: () =>
        withLayout(
            <SecurityPage
                user={mockUser}
                canManageTwoFactor
                passwordRecentlySuccessful
                twoFactorProps={{
                    enabled: true,
                    qrCodeSvg: '<svg/>',
                    manualSetupKey: 'ABCD EF12 3456 7890',
                    recoveryCodes: ['111111', '222222'],
                    processing: false,
                }}
                onPasswordSubmit={(form: PasswordForm) =>
                    console.log('[Settings Story] security', form)
                }
            />,
        ),
};

export const SecurityTwoFactorSetupFlow: Story = {
    render: () => {
        const [twoFactorProps, setTwoFactorProps] = useState<TwoFactorSectionProps>({
            enabled: false,
            manualSetupKey: 'ABCD EF12 3456 7890',
            onEnable: () => {
                console.log('enable requested');
                setTwoFactorProps((current) => ({
                    ...current,
                    enabled: true,
                }));
            },
        });

        const onEnable = useCallback(() => {
            setTwoFactorProps((current) => ({
                ...current,
                enabled: true,
            }));
        }, []);

        const onDisable = useCallback(() => {
            setTwoFactorProps((current) => ({
                ...current,
                enabled: false,
            }));
        }, []);

        return withLayout(
            <SecurityPage
                user={mockUser}
                canManageTwoFactor
                twoFactorProps={{
                    ...twoFactorProps,
                    onEnable,
                    onDisable,
                }}
                onPasswordSubmit={(form: PasswordForm) =>
                    console.log('[Settings Story] security', form)
                }
            />,
        );
    },
};

export const AppearanceDefault: Story = {
    render: () =>
        withLayout(
            <AppearancePage>
                <span className="text-sm text-muted-foreground">
                    Appearance settings placeholder content.
                </span>
            </AppearancePage>,
        ),
};
