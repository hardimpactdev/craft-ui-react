import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from '@storybook/test';
import type {
    ConfirmPasswordPageProps,
    ForgotPasswordPageProps,
    LoginPageProps,
    ResetPasswordPageProps,
    TwoFactorChallengePageProps,
    VerifyEmailPageProps,
} from '../../storybook-utils/pages/auth/types';
import LoginPage from '../../storybook-utils/pages/auth/login';
import RegisterPage from '../../storybook-utils/pages/auth/register';
import ForgotPasswordPage from '../../storybook-utils/pages/auth/forgot-password';
import ResetPasswordPage from '../../storybook-utils/pages/auth/reset-password';
import ConfirmPasswordPage from '../../storybook-utils/pages/auth/confirm-password';
import VerifyEmailPage from '../../storybook-utils/pages/auth/verify-email';
import TwoFactorChallengePage from '../../storybook-utils/pages/auth/two-factor-challenge';

const MockLogo = () => <span className="rounded bg-muted px-2 py-1 text-xs">LOGO</span>;

const handleSubmit = (label: string) => (form: Record<string, unknown>) => {
    console.log(`[Auth Card Story] ${label}:`, form);
};

const base = { variant: 'card' as const };

const meta: Meta = {
    title: 'Pages/Auth/Variants/Card',
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj;

export const LoginDefault: Story = {
    render: () => <LoginPage {...(base as LoginPageProps)} logo={<MockLogo />} onSubmit={(form) => handleSubmit('login')(form)} />,
};

export const RegisterDefault: Story = {
    render: () => <RegisterPage {...(base as any)} logo={<MockLogo />} onSubmit={(form) => handleSubmit('register')(form)} />,
};

export const ForgotPasswordDefault: Story = {
    render: () => {
        const props: ForgotPasswordPageProps = {
            ...base,
            logo: <MockLogo />,
            onSubmit: (form) => handleSubmit('forgot-password')(form),
        };

        return <ForgotPasswordPage {...props} />;
    },
};

export const ResetPasswordDefault: Story = {
    render: () => {
        const props: ResetPasswordPageProps = {
            ...base,
            token: 'token',
            email: 'john@example.com',
            logo: <MockLogo />,
            onSubmit: (form) => handleSubmit('reset-password')(form),
        };

        return <ResetPasswordPage {...props} />;
    },
};

export const ConfirmPasswordDefault: Story = {
    render: () => {
        const props: ConfirmPasswordPageProps = {
            ...base,
            logo: <MockLogo />,
            onSubmit: (form) => handleSubmit('confirm-password')(form),
        };

        return <ConfirmPasswordPage {...props} />;
    },
};

export const VerifyEmailDefault: Story = {
    render: () => {
        const props: VerifyEmailPageProps = {
            ...base,
            logo: <MockLogo />,
            onResend: () => console.log('resend verification'),
            onLogout: () => console.log('logout'),
        };

        return <VerifyEmailPage {...props} />;
    },
};

export const TwoFactorChallengeDefault: Story = {
    render: () => {
        const props: TwoFactorChallengePageProps = {
            ...base,
            logo: <MockLogo />,
            onSubmit: (form) => handleSubmit('two-factor-challenge')(form),
            onRecoverySubmit: (form) => handleSubmit('two-factor-recovery')(form),
        };

        return <TwoFactorChallengePage {...props} />;
    },
};

export const TwoFactorChallengeRecoveryMode: Story = {
    render: () => {
        const props: TwoFactorChallengePageProps = {
            ...base,
            logo: <MockLogo />,
            onSubmit: (form) => handleSubmit('two-factor-challenge')(form),
            onRecoverySubmit: (form) => handleSubmit('two-factor-recovery')(form),
        };

        return <TwoFactorChallengePage {...props} />;
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: /use a recovery code/i }));
    },
};

export const LoginWithStatus: Story = {
    render: () => (
        <LoginPage
            {...(base as LoginPageProps)}
            logo={<MockLogo />}
            status="Welcome back"
            onSubmit={(form) => handleSubmit('login')(form)}
        />
    ),
};

export const LoginWithErrors: Story = {
    render: () => (
        <LoginPage
            {...(base as LoginPageProps)}
            logo={<MockLogo />}
            errors={{
                email: 'Email is required.',
                password: 'Password is incorrect.',
            }}
            onSubmit={(form) => handleSubmit('login')(form)}
        />
    ),
};

export const LoginProcessing: Story = {
    render: () => (
        <LoginPage
            {...(base as LoginPageProps)}
            logo={<MockLogo />}
            processing
            onSubmit={(form) => handleSubmit('login')(form)}
        />
    ),
};

export const RegisterWithErrors: Story = {
    render: () => (
        <RegisterPage
            {...(base as any)}
            logo={<MockLogo />}
            errors={{
                name: 'A name is required.',
                email: 'Please enter a valid email.',
                password: 'Password is too short.',
            }}
            onSubmit={(form) => handleSubmit('register')(form)}
        />
    ),
};

export const RegisterProcessing: Story = {
    render: () => (
        <RegisterPage
            {...(base as any)}
            logo={<MockLogo />}
            processing
            onSubmit={(form) => handleSubmit('register')(form)}
        />
    ),
};

export const ForgotPasswordWithStatus: Story = {
    render: () => {
        const props: ForgotPasswordPageProps = {
            ...base,
            logo: <MockLogo />,
            status: 'A password reset link has been sent.',
            onSubmit: (form) => handleSubmit('forgot-password')(form),
        };

        return <ForgotPasswordPage {...props} />;
    },
};

export const ForgotPasswordWithErrors: Story = {
    render: () => {
        const props: ForgotPasswordPageProps = {
            ...base,
            logo: <MockLogo />,
            errors: { email: 'Unknown email address.' },
            onSubmit: (form) => handleSubmit('forgot-password')(form),
        };

        return <ForgotPasswordPage {...props} />;
    },
};

export const ResetPasswordWithErrors: Story = {
    render: () => {
        const props: ResetPasswordPageProps = {
            ...base,
            token: 'token',
            email: 'john@example.com',
            logo: <MockLogo />,
            errors: {
                password: 'Password must be longer than 8 characters.',
                password_confirmation: 'Passwords do not match.',
            },
            onSubmit: (form) => handleSubmit('reset-password')(form),
        };

        return <ResetPasswordPage {...props} />;
    },
};

export const ConfirmPasswordWithErrors: Story = {
    render: () => {
        const props: ConfirmPasswordPageProps = {
            ...base,
            logo: <MockLogo />,
            errors: { password: 'Wrong password.' },
            onSubmit: (form) => handleSubmit('confirm-password')(form),
        };

        return <ConfirmPasswordPage {...props} />;
    },
};

export const VerifyEmailWithStatus: Story = {
    render: () => {
        const props: VerifyEmailPageProps = {
            ...base,
            logo: <MockLogo />,
            status: 'A new verification link has been sent.',
            onResend: () => console.log('resend verification'),
            onLogout: () => console.log('logout'),
        };

        return <VerifyEmailPage {...props} />;
    },
};

export const TwoFactorChallengeWithErrors: Story = {
    render: () => {
        const props: TwoFactorChallengePageProps = {
            ...base,
            logo: <MockLogo />,
            errors: {
                code: 'The provided authentication code is invalid.',
                recovery_code: 'Recovery code is invalid.',
            },
            onSubmit: (form) => handleSubmit('two-factor-challenge')(form),
            onRecoverySubmit: (form) => handleSubmit('two-factor-recovery')(form),
        };

        return <TwoFactorChallengePage {...props} />;
    },
};
