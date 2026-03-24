import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd, KbdGroup } from '../../storybook-utils/components/ui/kbd';

const meta: Meta<typeof Kbd> = {
    title: 'UI/Kbd',
    component: Kbd,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'K',
    },
};

export const Shortcut: Story = {
    render: () => (
        <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
        </KbdGroup>
    ),
};

export const MultipleShortcuts: Story = {
    render: () => (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-8">
                <span className="text-sm">Copy</span>
                <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>C</Kbd>
                </KbdGroup>
            </div>
            <div className="flex items-center justify-between gap-8">
                <span className="text-sm">Paste</span>
                <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>V</Kbd>
                </KbdGroup>
            </div>
            <div className="flex items-center justify-between gap-8">
                <span className="text-sm">Undo</span>
                <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>Z</Kbd>
                </KbdGroup>
            </div>
        </div>
    ),
};
