import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '../../storybook-utils/components/ui/separator';

const meta: Meta<typeof Separator> = {
    title: 'UI/Separator',
    component: Separator,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
    render: () => (
        <div className="w-full max-w-sm">
            <div className="space-y-1">
                <h4 className="text-sm font-medium leading-none">Section One</h4>
                <p className="text-sm text-muted-foreground">Content above the separator.</p>
            </div>
            <Separator className="my-4" />
            <div className="space-y-1">
                <h4 className="text-sm font-medium leading-none">Section Two</h4>
                <p className="text-sm text-muted-foreground">Content below the separator.</p>
            </div>
        </div>
    ),
};

export const Vertical: Story = {
    render: () => (
        <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Home</div>
            <Separator orientation="vertical" />
            <div>About</div>
            <Separator orientation="vertical" />
            <div>Contact</div>
        </div>
    ),
};
