import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from '../storybook-utils/components/breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
    title: 'App/Breadcrumbs',
    component: Breadcrumbs,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        breadcrumbs: [
            { title: 'Home', href: '/' },
            { title: 'Current Page', href: '/current' },
        ],
    },
};

export const ThreeLevel: Story = {
    args: {
        breadcrumbs: [
            { title: 'Home', href: '/' },
            { title: 'Section', href: '/section' },
            { title: 'Current', href: '/current' },
        ],
    },
};
