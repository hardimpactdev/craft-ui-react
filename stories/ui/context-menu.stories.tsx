import type { Meta, StoryObj } from '@storybook/react-vite';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from '../../storybook-utils/components/ui/context-menu';

const meta: Meta<typeof ContextMenu> = {
    title: 'UI/ContextMenu',
    component: ContextMenu,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <ContextMenu>
            <ContextMenuTrigger>
                <div className="flex h-[150px] w-[300px] items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                    Right click here
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
                <ContextMenuItem>
                    Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                    Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                    Reload <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>
                    Save As... <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>Print</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    ),
};

export const WithSubmenu: Story = {
    render: () => (
        <ContextMenu>
            <ContextMenuTrigger>
                <div className="flex h-[150px] w-[300px] items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                    Right click here
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
                <ContextMenuLabel>Edit</ContextMenuLabel>
                <ContextMenuItem>Cut</ContextMenuItem>
                <ContextMenuItem>Copy</ContextMenuItem>
                <ContextMenuItem>Paste</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuSub>
                    <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                        <ContextMenuItem>Email</ContextMenuItem>
                        <ContextMenuItem>Messages</ContextMenuItem>
                        <ContextMenuItem>AirDrop</ContextMenuItem>
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    ),
};
