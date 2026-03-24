import type { Meta, StoryObj } from '@storybook/react-vite';
import SettingsLayout from '../storybook-utils/components/settings-layout';
import { Button } from '../storybook-utils/components/ui/button';
import { Input } from '../storybook-utils/components/ui/input';
import { Label } from '../storybook-utils/components/ui/label';

const meta: Meta<typeof SettingsLayout> = {
    title: 'Layouts/SettingsLayout',
    component: SettingsLayout,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: (
            <div className="space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" defaultValue="John Doe" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" defaultValue="john@example.com" />
                </div>
                <Button>Save changes</Button>
            </div>
        ),
    },
};
