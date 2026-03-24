import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollArea } from '../../storybook-utils/components/ui/scroll-area';
import { Separator } from '../../storybook-utils/components/ui/separator';

const meta: Meta<typeof ScrollArea> = {
    title: 'UI/ScrollArea',
    component: ScrollArea,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const tags = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

export const Default: Story = {
    render: () => (
        <ScrollArea className="h-72 w-48 rounded-md border">
            <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                {tags.map((tag) => (
                    <div key={tag}>
                        <div className="text-sm">{tag}</div>
                        <Separator className="my-2" />
                    </div>
                ))}
            </div>
        </ScrollArea>
    ),
};

export const LongContent: Story = {
    render: () => (
        <ScrollArea className="h-[300px] w-[350px] rounded-md border p-4">
            <div className="space-y-4">
                <h4 className="text-sm font-medium leading-none">Long Article</h4>
                {Array.from({ length: 10 }, (_, i) => (
                    <p key={i} className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                    </p>
                ))}
            </div>
        </ScrollArea>
    ),
};
