import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from '../../storybook-utils/components/ui/textarea';
import { Label } from '../../storybook-utils/components/ui/label';

const meta: Meta<typeof Textarea> = {
    title: 'UI/Textarea',
    component: Textarea,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
    args: {
        placeholder: 'Type your message here...',
    },
};

export const WithLabel: Story = {
    render: () => (
        <div className="grid w-full max-w-sm gap-1.5">
            <Label htmlFor="message">Your message</Label>
            <Textarea placeholder="Type your message here..." id="message" />
        </div>
    ),
};

export const Disabled: Story = {
    args: {
        placeholder: 'This textarea is disabled',
        disabled: true,
    },
};
