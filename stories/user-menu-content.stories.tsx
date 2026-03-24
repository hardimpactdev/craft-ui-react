import type { Meta, StoryObj } from '@storybook/react-vite';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '../storybook-utils/components/ui/dropdown-menu';
import { Button } from '../storybook-utils/components/ui/button';
import { UserMenuContent } from '../storybook-utils/components/user-menu-content';

const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: undefined,
    email_verified_at: '2024-01-01T00:00:00.000Z',
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-01-01T00:00:00.000Z',
};

const meta: Meta<typeof UserMenuContent> = {
    title: 'App/UserMenuContent',
    component: UserMenuContent,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Open User Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <UserMenuContent user={mockUser} />
            </DropdownMenuContent>
        </DropdownMenu>
    ),
};
