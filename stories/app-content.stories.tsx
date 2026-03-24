import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppContent } from '../storybook-utils/components/app-content';
import { SidebarProvider } from '../storybook-utils/components/ui/sidebar';

const meta: Meta<typeof AppContent> = {
    title: 'App/AppContent',
    component: AppContent,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SidebarVariant: Story = {
    decorators: [
        (Story) => (
            <SidebarProvider defaultOpen>
                <Story />
            </SidebarProvider>
        ),
    ],
    args: {
        variant: 'sidebar',
        children: (
            <div className="flex h-[50vh] items-center justify-center">
                <p className="text-muted-foreground">Sidebar variant content area</p>
            </div>
        ),
    },
};

export const HeaderVariant: Story = {
    args: {
        variant: 'header',
        children: (
            <div className="flex h-[50vh] items-center justify-center">
                <p className="text-muted-foreground">Header variant content area</p>
            </div>
        ),
    },
};
