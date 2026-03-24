import type { Meta, StoryObj } from '@storybook/react-vite';
import { BookOpen, Folder } from 'lucide-react';
import { NavFooter } from '../storybook-utils/components/nav-footer';
import {
    Sidebar,
    SidebarContent,
    SidebarProvider,
} from '../storybook-utils/components/ui/sidebar';

const meta: Meta<typeof NavFooter> = {
    title: 'App/NavFooter',
    component: NavFooter,
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
            {
                title: 'Repository',
                href: 'https://github.com/laravel/react-starter-kit',
                icon: Folder,
            },
            {
                title: 'Documentation',
                href: 'https://laravel.com/docs/starter-kits',
                icon: BookOpen,
            },
        ],
    },
};
