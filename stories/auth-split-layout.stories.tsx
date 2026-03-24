import type { Meta, StoryObj } from '@storybook/react-vite';
import AuthSplitLayout from '../storybook-utils/components/auth-split-layout';
import { Button } from '../storybook-utils/components/ui/button';
import { Input } from '../storybook-utils/components/ui/input';
import { Label } from '../storybook-utils/components/ui/label';

const meta: Meta<typeof AuthSplitLayout> = {
    title: 'Layouts/AuthSplitLayout',
    component: AuthSplitLayout,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Log in',
        description: 'Enter your email and password to log in.',
        children: (
            <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                </div>
                <Button className="w-full">Log in</Button>
            </div>
        ),
    },
};
