import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from '../../storybook-utils/components/ui/switch';
import { Label } from '../../storybook-utils/components/ui/label';

const meta: Meta<typeof Switch> = {
    title: 'UI/Switch',
    component: Switch,
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
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
    ),
};

export const Small: Story = {
    render: () => (
        <div className="flex items-center space-x-2">
            <Switch id="small-switch" size="sm" />
            <Label htmlFor="small-switch">Small switch</Label>
        </div>
    ),
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};
