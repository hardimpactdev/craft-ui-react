import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserIcon, SettingsIcon, MailIcon } from 'lucide-react';
import {
    Item,
    ItemMedia,
    ItemContent,
    ItemTitle,
    ItemDescription,
    ItemActions,
    ItemGroup,
} from '../../storybook-utils/components/ui/item';
import { Button } from '../../storybook-utils/components/ui/button';

const meta: Meta<typeof Item> = {
    title: 'UI/Item',
    component: Item,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Item>
            <ItemMedia variant="icon">
                <UserIcon />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>John Doe</ItemTitle>
                <ItemDescription>Software Engineer</ItemDescription>
            </ItemContent>
        </Item>
    ),
};

export const WithActions: Story = {
    render: () => (
        <Item variant="outline">
            <ItemMedia variant="icon">
                <MailIcon />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>Inbox notification</ItemTitle>
                <ItemDescription>You have a new message from Jane.</ItemDescription>
            </ItemContent>
            <ItemActions>
                <Button variant="outline" size="xs">View</Button>
            </ItemActions>
        </Item>
    ),
};

export const GroupedItems: Story = {
    render: () => (
        <ItemGroup>
            <Item variant="outline">
                <ItemMedia variant="icon">
                    <UserIcon />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>Profile</ItemTitle>
                    <ItemDescription>Manage your profile settings</ItemDescription>
                </ItemContent>
            </Item>
            <Item variant="outline">
                <ItemMedia variant="icon">
                    <SettingsIcon />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>Settings</ItemTitle>
                    <ItemDescription>Configure application preferences</ItemDescription>
                </ItemContent>
            </Item>
            <Item variant="outline">
                <ItemMedia variant="icon">
                    <MailIcon />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>Notifications</ItemTitle>
                    <ItemDescription>Manage notification preferences</ItemDescription>
                </ItemContent>
            </Item>
        </ItemGroup>
    ),
};
