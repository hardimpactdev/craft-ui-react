import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../storybook-utils/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../../storybook-utils/components/ui/sheet';

const meta: Meta<typeof Sheet> = {
    title: 'UI/Sheet',
    component: Sheet,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Sheet Title</SheetTitle>
                    <SheetDescription>
                        This is a sheet that slides in from the right.
                    </SheetDescription>
                </SheetHeader>
                <div className="p-4">
                    <p className="text-sm text-muted-foreground">Sheet content goes here.</p>
                </div>
            </SheetContent>
        </Sheet>
    ),
};

export const LeftSide: Story = {
    render: () => (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open Left Sheet</Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Left Sheet</SheetTitle>
                    <SheetDescription>
                        This sheet slides in from the left.
                    </SheetDescription>
                </SheetHeader>
                <div className="p-4">
                    <p className="text-sm text-muted-foreground">Sheet content goes here.</p>
                </div>
            </SheetContent>
        </Sheet>
    ),
};
