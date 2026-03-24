import type { Meta, StoryObj } from '@storybook/react-vite';
import { AspectRatio } from '../../storybook-utils/components/ui/aspect-ratio';

const meta: Meta<typeof AspectRatio> = {
    title: 'UI/AspectRatio',
    component: AspectRatio,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Widescreen: Story = {
    render: () => (
        <div className="w-[450px]">
            <AspectRatio ratio={16 / 9}>
                <img
                    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                    alt="Landscape photograph"
                    className="size-full rounded-lg object-cover"
                />
            </AspectRatio>
        </div>
    ),
};

export const Square: Story = {
    render: () => (
        <div className="w-[300px]">
            <AspectRatio ratio={1}>
                <div className="flex size-full items-center justify-center rounded-lg bg-muted">
                    <span className="text-sm text-muted-foreground">1:1</span>
                </div>
            </AspectRatio>
        </div>
    ),
};

export const Portrait: Story = {
    render: () => (
        <div className="w-[250px]">
            <AspectRatio ratio={3 / 4}>
                <div className="flex size-full items-center justify-center rounded-lg bg-muted">
                    <span className="text-sm text-muted-foreground">3:4</span>
                </div>
            </AspectRatio>
        </div>
    ),
};
