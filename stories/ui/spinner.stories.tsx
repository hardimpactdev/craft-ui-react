import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from '../../storybook-utils/components/ui/spinner';

const meta: Meta<typeof Spinner> = {
    title: 'UI/Spinner',
    component: Spinner,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = {
    args: {
        className: 'size-8',
    },
};

export const CustomColor: Story = {
    args: {
        className: 'size-6 text-blue-500',
    },
};
