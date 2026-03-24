import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../storybook-utils/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '../../storybook-utils/components/ui/tooltip';

const meta: Meta<typeof Tooltip> = {
    title: 'UI/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>This is a tooltip</p>
            </TooltipContent>
        </Tooltip>
    ),
};
