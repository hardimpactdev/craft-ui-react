import type { ReactNode } from 'react';
import type { AuthLayoutVariant, FormErrors } from '@/lib/types';

export interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

export interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface ForgotPasswordForm {
    email: string;
}

export interface ResetPasswordForm {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
}

export interface ConfirmPasswordForm {
    password: string;
}

export interface TwoFactorForm {
    code: string;
}

export interface TwoFactorRecoveryForm {
    recovery_code: string;
}

export interface LoginPageProps {
    status?: string;
    errors?: FormErrors<LoginForm>;
    processing?: boolean;
    canResetPassword?: boolean;
    canRegister?: boolean;
    forgotPasswordUrl?: string;
    registerUrl?: string;
    logoLink?: string;
    variant?: AuthLayoutVariant;
    name?: string;
    logo?: ReactNode;
    onSubmit?: (form: LoginForm) => void;
    passkeysEnabled?: boolean;
    onPasskeyLogin?: () => void;
}

export interface RegisterPageProps {
    errors?: FormErrors<RegisterForm>;
    processing?: boolean;
    loginUrl?: string;
    logoLink?: string;
    variant?: AuthLayoutVariant;
    name?: string;
    logo?: ReactNode;
    onSubmit?: (form: RegisterForm) => void;
}

export interface ForgotPasswordPageProps {
    status?: string;
    errors?: FormErrors<ForgotPasswordForm>;
    processing?: boolean;
    loginUrl?: string;
    logoLink?: string;
    variant?: AuthLayoutVariant;
    name?: string;
    logo?: ReactNode;
    onSubmit?: (form: ForgotPasswordForm) => void;
}

export interface ResetPasswordPageProps {
    token: string;
    email: string;
    errors?: FormErrors<ResetPasswordForm>;
    processing?: boolean;
    loginUrl?: string;
    logoLink?: string;
    variant?: AuthLayoutVariant;
    name?: string;
    logo?: ReactNode;
    onSubmit?: (form: ResetPasswordForm) => void;
}

export interface ConfirmPasswordPageProps {
    errors?: FormErrors<ConfirmPasswordForm>;
    processing?: boolean;
    logoLink?: string;
    variant?: AuthLayoutVariant;
    name?: string;
    logo?: ReactNode;
    onSubmit?: (form: ConfirmPasswordForm) => void;
}

export interface VerifyEmailPageProps {
    status?: string;
    processing?: boolean;
    logoLink?: string;
    variant?: AuthLayoutVariant;
    name?: string;
    logo?: ReactNode;
    onResend?: () => void;
    onLogout?: () => void;
}

export interface TwoFactorChallengePageProps {
    errors?: FormErrors<TwoFactorForm> & FormErrors<TwoFactorRecoveryForm>;
    processing?: boolean;
    logoLink?: string;
    variant?: AuthLayoutVariant;
    name?: string;
    logo?: ReactNode;
    onSubmit?: (form: TwoFactorForm) => void;
    onRecoverySubmit?: (form: TwoFactorRecoveryForm) => void;
}
