import type { ReactNode } from 'react';
import type { FormErrors } from '@/lib/types';

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
}

export interface ProfileForm {
    name: string;
    email: string;
}

export interface PasswordForm {
    current_password: string;
    password: string;
    password_confirmation: string;
}

export interface ProfilePageProps {
    user: User;
    status?: string;
    errors?: FormErrors<ProfileForm>;
    processing?: boolean;
    recentlySuccessful?: boolean;
    mustVerifyEmail?: boolean;
    onSubmit?: (form: ProfileForm) => void;
    onResendVerification?: () => void;
    deleteErrors?: { password?: string };
    deleteProcessing?: boolean;
    onDelete?: (password: string) => void;
    title?: string;
    description?: string;
    children?: ReactNode;
}

export interface TwoFactorSectionProps {
    enabled: boolean;
    qrCodeSvg?: string;
    manualSetupKey?: string;
    recoveryCodes?: string[];
    confirmationRequired?: boolean;
    errors?: Record<string, string>;
    processing?: boolean;
    onEnable?: () => void;
    onConfirm?: (code: string) => void;
    onDisable?: () => void;
    onRegenerateCodes?: () => void;
    onFetchRecoveryCodes?: () => void;
    onFetchSetupData?: () => void;
}

export interface SecurityPageProps {
    user: User;
    passwordErrors?: FormErrors<PasswordForm>;
    passwordProcessing?: boolean;
    passwordRecentlySuccessful?: boolean;
    onPasswordSubmit?: (form: PasswordForm) => void;
    canManageTwoFactor?: boolean;
    twoFactorProps?: TwoFactorSectionProps;
}

export interface AppearancePageProps {
    title?: string;
    description?: string;
    children?: ReactNode;
}
