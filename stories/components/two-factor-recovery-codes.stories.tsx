import type { Meta, StoryObj } from '@storybook/react-vite';
import TwoFactorRecoveryCodes from '../../storybook-utils/components/two-factor-recovery-codes';

const meta: Meta<typeof TwoFactorRecoveryCodes> = {
    title: 'Components/TwoFactorRecoveryCodes',
    component: TwoFactorRecoveryCodes,
};

export default meta;
type Story = StoryObj<typeof meta>;

const commonCodes = ['AA11BB22', 'CC33DD44', 'EE55FF66', 'GG77HH88'];

export const Hidden: Story = {
    args: {
        codes: commonCodes,
        visible: false,
        onToggleVisibility: () => console.log('toggle visibility'),
    },
};

export const Visible: Story = {
    args: {
        codes: commonCodes,
        visible: true,
        onToggleVisibility: () => console.log('toggle visibility'),
        onRegenerate: () => console.log('regenerate codes'),
    },
};

export const Regenerating: Story = {
    args: {
        ...Visible.args,
        processing: true,
    },
};
