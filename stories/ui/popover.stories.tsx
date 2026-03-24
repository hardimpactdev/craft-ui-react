import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../storybook-utils/components/ui/button';
import { Input } from '../../storybook-utils/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from '../../storybook-utils/components/ui/popover';

const meta: Meta<typeof Popover> = {
    title: 'UI/Popover',
    component: Popover,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
                Open popover
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>
                    <PopoverTitle>Dimensions</PopoverTitle>
                    <PopoverDescription>
                        Set the dimensions for the layer.
                    </PopoverDescription>
                </PopoverHeader>
                <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-sm" htmlFor="width">Width</label>
                        <Input id="width" defaultValue="100%" className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-sm" htmlFor="height">Height</label>
                        <Input id="height" defaultValue="25px" className="col-span-2" />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    ),
};

export const Simple: Story = {
    render: () => (
        <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
                Info
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>
                    <PopoverTitle>Help</PopoverTitle>
                    <PopoverDescription>
                        This is a simple popover with a title and description.
                    </PopoverDescription>
                </PopoverHeader>
            </PopoverContent>
        </Popover>
    ),
};

export const TopPlacement: Story = {
    render: () => (
        <div className="flex min-h-[200px] items-end justify-center">
            <Popover>
                <PopoverTrigger render={<Button variant="outline" />}>
                    Open above
                </PopoverTrigger>
                <PopoverContent side="top">
                    <p className="text-sm">This popover appears above the trigger button.</p>
                </PopoverContent>
            </Popover>
        </div>
    ),
};
