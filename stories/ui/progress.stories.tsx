import type { Meta, StoryObj } from '@storybook/react-vite';
import {
    Progress,
    ProgressLabel,
    ProgressValue,
} from '../../storybook-utils/components/ui/progress';

const meta: Meta<typeof Progress> = {
    title: 'UI/Progress',
    component: Progress,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Quarter: Story = {
    args: {
        value: 25,
    },
};

export const Half: Story = {
    args: {
        value: 50,
    },
};

export const ThreeQuarters: Story = {
    args: {
        value: 75,
    },
};

export const WithLabelAndValue: Story = {
    render: () => (
        <Progress value={60}>
            <ProgressLabel>Uploading...</ProgressLabel>
            <ProgressValue />
        </Progress>
    ),
};

export const AllValues: Story = {
    render: () => (
        <div className="flex w-full max-w-md flex-col gap-6">
            <Progress value={25}>
                <ProgressLabel>25%</ProgressLabel>
                <ProgressValue />
            </Progress>
            <Progress value={50}>
                <ProgressLabel>50%</ProgressLabel>
                <ProgressValue />
            </Progress>
            <Progress value={75}>
                <ProgressLabel>75%</ProgressLabel>
                <ProgressValue />
            </Progress>
        </div>
    ),
};
