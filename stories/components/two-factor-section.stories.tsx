import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { userEvent, within } from '@storybook/test';
import TwoFactorSection from '../../storybook-utils/components/two-factor-section';

const meta: Meta<typeof TwoFactorSection> = {
    title: 'Components/TwoFactorSection',
    component: TwoFactorSection,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Disabled: Story = {
    args: {
        enabled: false,
        manualSetupKey: 'ABCD-EFGH-IJKL',
        onEnable: () => console.log('enable'),
        onFetchSetupData: () => console.log('fetch setup data'),
        onFetchRecoveryCodes: () => console.log('fetch recovery codes'),
    },
};

export const Enabled: Story = {
    args: {
        enabled: true,
        qrCodeSvg:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="black"/><path d="M6 6h12v12H6z" fill="white"/></svg>',
        manualSetupKey: 'ABCD-EFGH-IJKL',
        recoveryCodes: ['AA11BB22', 'CC33DD44', 'EE55FF66'],
        onDisable: () => console.log('disable'),
        onFetchRecoveryCodes: () => console.log('fetch recovery codes'),
        onRegenerateCodes: () => console.log('regenerate codes'),
        onEnable: () => console.log('enable'),
        onConfirm: (code: string) => console.log('confirm', code),
        onFetchSetupData: () => console.log('fetch setup data'),
    },
};

export const SetupFlow: Story = {
    render: () => {
        const [visible, setVisible] = useState(false);

        return (
            <div className="space-y-2">
                <TwoFactorSection
                    enabled={false}
                    manualSetupKey="ABCD-EFGH-IJKL"
                    qrCodeSvg="<svg/>"
                    confirmationRequired={false}
                    onEnable={() => console.log('onEnable')}
                    onFetchSetupData={() => console.log('fetch setup data')}
                    onConfirm={(code) => console.log('confirm', code)}
                />
                <button
                    type="button"
                    onClick={() => setVisible(!visible)}
                    className="text-xs text-muted-foreground underline"
                >
                    toggle debug control
                </button>
            </div>
        );
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(
            canvas.getByRole('button', { name: /enable two-factor authentication/i }),
        );
    },
};
