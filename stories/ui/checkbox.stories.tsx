import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '../../storybook-utils/components/ui/checkbox';
import { Label } from '../../storybook-utils/components/ui/label';

const meta: Meta<typeof Checkbox> = {
    title: 'UI/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
    args: {
        defaultChecked: true,
    },
};

export const WithLabel: Story = {
    render: () => (
        <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
    ),
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};
