import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppHeader } from '../storybook-utils/components/app-header';

const meta: Meta<typeof AppHeader> = {
    title: 'App/AppHeader',
    component: AppHeader,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        breadcrumbs: [],
    },
};

export const WithBreadcrumbs: Story = {
    args: {
        breadcrumbs: [
            { title: 'Home', href: '/' },
            { title: 'Settings', href: '/settings' },
            { title: 'Profile', href: '/settings/profile' },
        ],
    },
};
