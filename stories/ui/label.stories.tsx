import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '../../storybook-utils/components/ui/label';
import { Input } from '../../storybook-utils/components/ui/input';

const meta: Meta<typeof Label> = {
    title: 'UI/Label',
    component: Label,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Label text',
    },
};

export const WithInput: Story = {
    render: () => (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" placeholder="Your name" />
        </div>
    ),
};
