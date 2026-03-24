import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from '../../storybook-utils/components/ui/slider';

const meta: Meta<typeof Slider> = {
    title: 'UI/Slider',
    component: Slider,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        defaultValue: [50],
        max: 100,
        min: 0,
    },
    decorators: [
        (Story) => (
            <div className="w-[300px]">
                <Story />
            </div>
        ),
    ],
};

export const Range: Story = {
    args: {
        defaultValue: [25, 75],
        max: 100,
        min: 0,
    },
    decorators: [
        (Story) => (
            <div className="w-[300px]">
                <Story />
            </div>
        ),
    ],
};

export const WithSteps: Story = {
    args: {
        defaultValue: [50],
        max: 100,
        min: 0,
        step: 10,
    },
    decorators: [
        (Story) => (
            <div className="w-[300px]">
                <Story />
            </div>
        ),
    ],
};
