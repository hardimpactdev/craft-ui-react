import type { Meta, StoryObj } from '@storybook/react-vite';
import AppLogoIcon from '../storybook-utils/components/app-logo-icon';

const meta: Meta<typeof AppLogoIcon> = {
    title: 'App/AppLogoIcon',
    component: AppLogoIcon,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <AppLogoIcon className="h-10 w-10 fill-current text-black dark:text-white" />
    ),
};
