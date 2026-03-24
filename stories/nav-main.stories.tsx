import type { Meta, StoryObj } from '@storybook/react-vite';
import { LayoutGrid, Settings, Users } from 'lucide-react';
import { NavMain } from '../storybook-utils/components/nav-main';
import { SidebarProvider, Sidebar, SidebarContent } from '../storybook-utils/components/ui/sidebar';

const meta: Meta<typeof NavMain> = {
    title: 'App/NavMain',
    component: NavMain,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <SidebarProvider defaultOpen>
                <Sidebar>
                    <SidebarContent>
                        <Story />
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: [
            { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
            { title: 'Users', href: '/users', icon: Users },
            { title: 'Settings', href: '/settings', icon: Settings },
        ],
    },
};
