import type { Meta, StoryObj } from '@storybook/react-vite';
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from '../../storybook-utils/components/ui/hover-card';

const meta: Meta<typeof HoverCard> = {
    title: 'UI/HoverCard',
    component: HoverCard,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <HoverCard>
            <HoverCardTrigger>
                <a href="#" className="text-sm font-medium underline underline-offset-4">
                    @nextjs
                </a>
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold">Next.js</p>
                    <p className="text-sm text-muted-foreground">
                        The React Framework — created and maintained by @vercel.
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Joined December 2021
                    </p>
                </div>
            </HoverCardContent>
        </HoverCard>
    ),
};

export const WithSideTop: Story = {
    render: () => (
        <div className="flex min-h-[200px] items-end justify-center">
            <HoverCard>
                <HoverCardTrigger>
                    <a href="#" className="text-sm font-medium underline underline-offset-4">
                        Hover for details
                    </a>
                </HoverCardTrigger>
                <HoverCardContent side="top">
                    <p className="text-sm">This hover card appears above the trigger.</p>
                </HoverCardContent>
            </HoverCard>
        </div>
    ),
};
