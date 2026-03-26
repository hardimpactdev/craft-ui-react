import type { Meta, StoryObj } from '@storybook/react-vite';
import AppSidebarLayout from '../storybook-utils/components/app-sidebar-layout';
import DashboardPage from '../storybook-utils/pages/dashboard';

const meta: Meta = {
    title: 'Pages/Dashboard',
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => (
        <AppSidebarLayout>
            <DashboardPage />
        </AppSidebarLayout>
    ),
};

export const WithCustomContent: Story = {
    render: () => (
        <AppSidebarLayout>
            <div className="rounded-xl border p-8">
                <h1 className="text-lg font-semibold">Custom dashboard content</h1>
                <p className="text-sm text-muted-foreground">
                    This replaces the default placeholder grid.
                </p>
            </div>
        </AppSidebarLayout>
    ),
};
