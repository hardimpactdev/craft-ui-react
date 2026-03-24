import type { Meta, StoryObj } from '@storybook/react-vite';
import { InboxIcon, SearchIcon, FileTextIcon } from 'lucide-react';
import { Button } from '../../storybook-utils/components/ui/button';
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
} from '../../storybook-utils/components/ui/empty';

const meta: Meta<typeof Empty> = {
    title: 'UI/Empty',
    component: Empty,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Empty>
            <EmptyHeader>
                <EmptyMedia>
                    <InboxIcon className="size-10 text-muted-foreground" />
                </EmptyMedia>
                <EmptyTitle>No results found</EmptyTitle>
                <EmptyDescription>
                    There are no items to display at this time.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    ),
};

export const WithIconVariant: Story = {
    render: () => (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <SearchIcon />
                </EmptyMedia>
                <EmptyTitle>No search results</EmptyTitle>
                <EmptyDescription>
                    Try adjusting your search or filter to find what you're looking for.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    ),
};

export const WithAction: Story = {
    render: () => (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <FileTextIcon />
                </EmptyMedia>
                <EmptyTitle>No documents yet</EmptyTitle>
                <EmptyDescription>
                    Get started by creating your first document.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button>Create document</Button>
            </EmptyContent>
        </Empty>
    ),
};
