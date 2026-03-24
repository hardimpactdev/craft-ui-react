import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchIcon, MailIcon, EyeIcon } from 'lucide-react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupButton,
    InputGroupText,
} from '../../storybook-utils/components/ui/input-group';

const meta: Meta<typeof InputGroup> = {
    title: 'UI/InputGroup',
    component: InputGroup,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithIconAddon: Story = {
    render: () => (
        <InputGroup>
            <InputGroupAddon align="inline-start">
                <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search..." />
        </InputGroup>
    ),
};

export const WithTextAddon: Story = {
    render: () => (
        <InputGroup>
            <InputGroupAddon align="inline-start">
                <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="example.com" />
        </InputGroup>
    ),
};

export const WithButtonAddon: Story = {
    render: () => (
        <InputGroup>
            <InputGroupAddon align="inline-start">
                <MailIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="Enter your email" />
            <InputGroupAddon align="inline-end">
                <InputGroupButton>
                    <EyeIcon />
                </InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    ),
};
