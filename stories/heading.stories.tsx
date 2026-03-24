import type { Meta, StoryObj } from '@storybook/react-vite';
import Heading from '../storybook-utils/components/heading';

const meta: Meta<typeof Heading> = {
    title: 'App/Heading',
    component: Heading,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Page Title',
        description: 'A description of the page.',
    },
};

export const WithoutDescription: Story = {
    args: {
        title: 'Page Title',
    },
};

export const Small: Story = {
    args: {
        title: 'Small Heading',
        description: 'A smaller variant of the heading.',
        variant: 'small',
    },
};
