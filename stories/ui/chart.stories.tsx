import type { Meta, StoryObj } from '@storybook/react';
import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '../../storybook-utils/components/ui/chart';

const meta: Meta<typeof ChartContainer> = {
    title: 'UI/Chart',
    component: ChartContainer,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const barData = [
    { month: 'Jan', desktop: 186, mobile: 80 },
    { month: 'Feb', desktop: 305, mobile: 200 },
    { month: 'Mar', desktop: 237, mobile: 120 },
    { month: 'Apr', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'Jun', desktop: 214, mobile: 140 },
];

const chartConfig = {
    desktop: { label: 'Desktop', color: 'var(--color-chart-1)' },
    mobile: { label: 'Mobile', color: 'var(--color-chart-2)' },
} satisfies ChartConfig;

export const BarChartExample: Story = {
    render: () => (
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <BarChart data={barData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="desktop" fill="var(--color-chart-1)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-chart-2)" radius={4} />
            </BarChart>
        </ChartContainer>
    ),
};

const lineData = [
    { month: 'Jan', value: 186 },
    { month: 'Feb', value: 305 },
    { month: 'Mar', value: 237 },
    { month: 'Apr', value: 73 },
    { month: 'May', value: 209 },
    { month: 'Jun', value: 214 },
];

const lineConfig = {
    value: { label: 'Visitors', color: 'var(--color-chart-1)' },
} satisfies ChartConfig;

export const LineChartExample: Story = {
    render: () => (
        <ChartContainer config={lineConfig} className="min-h-[300px] w-full">
            <LineChart data={lineData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="value" stroke="var(--color-chart-1)" strokeWidth={2} />
            </LineChart>
        </ChartContainer>
    ),
};
