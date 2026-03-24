import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlaceholderPattern } from '../../storybook-utils/components/ui/placeholder-pattern';

const meta: Meta<typeof PlaceholderPattern> = {
    title: 'UI/PlaceholderPattern',
    component: PlaceholderPattern,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <div className="h-[200px] w-[400px] overflow-hidden rounded-lg border">
            <PlaceholderPattern className="h-full w-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        </div>
    ),
};
