import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../../storybook-utils/components/ui/input';
import { Label } from '../../storybook-utils/components/ui/label';

const meta: Meta<typeof Input> = {
    title: 'UI/Input',
    component: Input,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const WithPlaceholder: Story = {
    args: {
        placeholder: 'Enter your email...',
    },
};

export const Disabled: Story = {
    args: {
        placeholder: 'Disabled input',
        disabled: true,
    },
};

export const WithLabel: Story = {
    render: () => (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
        </div>
    ),
};
