import type { Meta, StoryObj } from '@storybook/react-vite';
import { toast } from 'sonner';
import { Toaster } from '../../storybook-utils/components/ui/sonner';
import { Button } from '../../storybook-utils/components/ui/button';

const meta: Meta<typeof Toaster> = {
    title: 'UI/Sonner',
    component: Toaster,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <>
                <Story />
                <Toaster />
            </>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Button onClick={() => toast('Event has been created.')}>
            Show Toast
        </Button>
    ),
};

export const Success: Story = {
    render: () => (
        <Button onClick={() => toast.success('Changes saved successfully.')}>
            Show Success Toast
        </Button>
    ),
};

export const WithDescription: Story = {
    render: () => (
        <Button
            onClick={() =>
                toast('Event has been created', {
                    description: 'Sunday, December 03, 2023 at 9:00 AM',
                })
            }
        >
            Show Toast with Description
        </Button>
    ),
};
