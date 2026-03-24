import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from '../storybook-utils/components/app-shell';

const meta: Meta<typeof AppShell> = {
    title: 'App/AppShell',
    component: AppShell,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SidebarVariant: Story = {
    args: {
        variant: 'sidebar',
        children: (
            <div className="flex h-screen items-center justify-center">
                <p className="text-muted-foreground">Sidebar shell content</p>
            </div>
        ),
    },
};

export const HeaderVariant: Story = {
    args: {
        variant: 'header',
        children: (
            <div className="flex h-screen items-center justify-center">
                <p className="text-muted-foreground">Header shell content</p>
            </div>
        ),
    },
};
