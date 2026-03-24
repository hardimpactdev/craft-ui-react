import type { Meta, StoryObj } from '@storybook/react-vite';
import AppLayout from '../storybook-utils/components/app-layout';

const meta: Meta<typeof AppLayout> = {
    title: 'Layouts/AppLayout',
    component: AppLayout,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        breadcrumbs: [
            { title: 'Dashboard', href: '/' },
        ],
        children: (
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-muted/50" />
                    <div className="aspect-video rounded-xl bg-muted/50" />
                    <div className="aspect-video rounded-xl bg-muted/50" />
                </div>
                <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50" />
            </div>
        ),
    },
};
