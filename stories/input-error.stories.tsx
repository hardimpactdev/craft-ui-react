import type { Meta, StoryObj } from '@storybook/react-vite';
import InputError from '../storybook-utils/components/input-error';

const meta: Meta<typeof InputError> = {
    title: 'App/InputError',
    component: InputError,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithMessage: Story = {
    args: {
        message: 'This field is required.',
    },
};

export const Empty: Story = {
    args: {
        message: undefined,
    },
};
