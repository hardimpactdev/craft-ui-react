import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserInfo } from '../storybook-utils/components/user-info';

const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: undefined,
    email_verified_at: '2024-01-01T00:00:00.000Z',
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-01-01T00:00:00.000Z',
};

const meta: Meta<typeof UserInfo> = {
    title: 'App/UserInfo',
    component: UserInfo,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithFallbackInitials: Story = {
    render: () => (
        <div className="flex items-center gap-2">
            <UserInfo user={mockUser} />
        </div>
    ),
};

export const WithAvatar: Story = {
    render: () => (
        <div className="flex items-center gap-2">
            <UserInfo user={{ ...mockUser, avatar: 'https://github.com/shadcn.png' }} />
        </div>
    ),
};

export const WithEmail: Story = {
    render: () => (
        <div className="flex items-center gap-2">
            <UserInfo user={mockUser} showEmail />
        </div>
    ),
};
