import type { Meta, StoryObj } from '@storybook/react-vite';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../../storybook-utils/components/ui/carousel';

const meta: Meta<typeof Carousel> = {
    title: 'UI/Carousel',
    component: Carousel,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <div className="mx-auto w-full max-w-xs">
            <Carousel>
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="flex aspect-square items-center justify-center rounded-lg border bg-card p-6">
                                <span className="text-4xl font-semibold">
                                    {index + 1}
                                </span>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    ),
};

export const MultiplePerView: Story = {
    render: () => (
        <div className="mx-auto w-full max-w-sm">
            <Carousel opts={{ align: 'start' }}>
                <CarouselContent className="-ml-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-1/3 pl-2"
                        >
                            <div className="flex aspect-square items-center justify-center rounded-lg border bg-card p-2">
                                <span className="text-2xl font-semibold">
                                    {index + 1}
                                </span>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    ),
};

export const Vertical: Story = {
    render: () => (
        <div className="mx-auto w-full max-w-xs">
            <Carousel orientation="vertical" className="mt-4">
                <CarouselContent className="-mt-2 h-[200px]">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="basis-1/2 pt-2">
                            <div className="flex items-center justify-center rounded-lg border bg-card p-4">
                                <span className="text-2xl font-semibold">
                                    {index + 1}
                                </span>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    ),
};
