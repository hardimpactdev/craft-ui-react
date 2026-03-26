import type { Meta, StoryObj } from '@storybook/react-vite';
import TwoFactorSetupModal from '../../storybook-utils/components/two-factor-setup-modal';

const meta: Meta<typeof TwoFactorSetupModal> = {
    title: 'Components/TwoFactorSetupModal',
    component: TwoFactorSetupModal,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Step1: Story = {
    args: {
        open: true,
        onOpenChange: () => {},
        qrCodeSvg:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="black"/><path d="M6 6h12v12H6z" fill="white"/></svg>',
        manualSetupKey: 'ABCD-EFGH-IJKL',
        recoveryCodes: ['111111', '222222'],
        onEnable: () => console.log('enable requested'),
        onConfirm: (code: string) => console.log('confirm', code),
        onFetchSetupData: () => console.log('fetch setup data'),
    },
};

export const Step2: Story = {
    args: {
        ...Step1.args,
        confirmationRequired: true,
    },
};

export const WithError: Story = {
    args: {
        ...Step1.args,
        errors: {
            code: 'The confirmation code is not valid.',
        },
    },
};

export const Processing: Story = {
    args: {
        ...Step1.args,
        processing: true,
    },
};
