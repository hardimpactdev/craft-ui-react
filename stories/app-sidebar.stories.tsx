import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppSidebar } from '../storybook-utils/components/app-sidebar';
import { SidebarProvider } from '../storybook-utils/components/ui/sidebar';

const meta: Meta<typeof AppSidebar> = {
    title: 'App/AppSidebar',
    component: AppSidebar,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <SidebarProvider defaultOpen>
                <Story />
                <main className="flex-1 p-4">
                    <p className="text-muted-foreground">Main content area</p>
                </main>
            </SidebarProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
