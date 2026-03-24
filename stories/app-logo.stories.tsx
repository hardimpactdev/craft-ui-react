import type { Meta, StoryObj } from '@storybook/react-vite';
import AppLogo from '../storybook-utils/components/app-logo';

const meta: Meta<typeof AppLogo> = {
    title: 'App/AppLogo',
    component: AppLogo,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <div className="flex items-center">
            <AppLogo />
        </div>
    ),
};
