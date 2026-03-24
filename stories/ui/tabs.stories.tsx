import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../storybook-utils/components/ui/tabs';

const meta: Meta<typeof Tabs> = {
    title: 'UI/Tabs',
    component: Tabs,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <p className="text-sm text-muted-foreground p-4">
                    Manage your account settings and preferences.
                </p>
            </TabsContent>
            <TabsContent value="password">
                <p className="text-sm text-muted-foreground p-4">
                    Change your password and security settings.
                </p>
            </TabsContent>
            <TabsContent value="settings">
                <p className="text-sm text-muted-foreground p-4">
                    Configure your application settings.
                </p>
            </TabsContent>
        </Tabs>
    ),
};
