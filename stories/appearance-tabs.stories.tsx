import type { Meta, StoryObj } from '@storybook/react-vite';
import AppearanceToggleTab from '../storybook-utils/components/appearance-tabs';

const meta: Meta<typeof AppearanceToggleTab> = {
    title: 'App/AppearanceToggleTab',
    component: AppearanceToggleTab,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
