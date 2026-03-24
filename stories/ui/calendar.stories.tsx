import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar } from '../../storybook-utils/components/ui/calendar';

const meta: Meta<typeof Calendar> = {
    title: 'UI/Calendar',
    component: Calendar,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <Calendar />,
};

export const WithSelectedDate: Story = {
    render: () => <Calendar mode="single" selected={new Date()} />,
};
