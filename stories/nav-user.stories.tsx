import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavUser } from '../storybook-utils/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarProvider,
} from '../storybook-utils/components/ui/sidebar';

const meta: Meta<typeof NavUser> = {
    title: 'App/NavUser',
    component: NavUser,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <SidebarProvider defaultOpen>
                <Sidebar>
                    <SidebarContent />
                    <SidebarFooter>
                        <Story />
                    </SidebarFooter>
                </Sidebar>
            </SidebarProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
