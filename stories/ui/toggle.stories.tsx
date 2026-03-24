import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bold } from 'lucide-react';
import { Toggle } from '../../storybook-utils/components/ui/toggle';

const meta: Meta<typeof Toggle> = {
    title: 'UI/Toggle',
    component: Toggle,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Toggle',
    },
};

export const WithIcon: Story = {
    render: () => (
        <Toggle aria-label="Toggle bold">
            <Bold />
        </Toggle>
    ),
};

export const Pressed: Story = {
    args: {
        defaultPressed: true,
        children: 'Pressed',
    },
};
