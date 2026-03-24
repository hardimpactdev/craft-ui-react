import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppSidebarHeader } from '../storybook-utils/components/app-sidebar-header';
import {
    Sidebar,
    SidebarInset,
    SidebarProvider,
} from '../storybook-utils/components/ui/sidebar';

const meta: Meta<typeof AppSidebarHeader> = {
    title: 'App/AppSidebarHeader',
    component: AppSidebarHeader,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <SidebarProvider defaultOpen>
                <Sidebar>
                    <div />
                </Sidebar>
                <SidebarInset>
                    <Story />
                </SidebarInset>
            </SidebarProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        breadcrumbs: [
            { title: 'Dashboard', href: '/' },
        ],
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
