import type { Meta, StoryObj } from '@storybook/react-vite';
import TextLink from '../storybook-utils/components/text-link';

const meta: Meta<typeof TextLink> = {
    title: 'App/TextLink',
    component: TextLink,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        href: '/example',
        children: 'Click here',
    },
};

export const WithCustomClass: Story = {
    args: {
        href: '/example',
        children: 'Styled link',
        className: 'text-lg font-bold',
    },
};
