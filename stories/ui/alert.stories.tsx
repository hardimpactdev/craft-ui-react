import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertCircle, Terminal } from 'lucide-react';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '../../storybook-utils/components/ui/alert';

const meta: Meta<typeof Alert> = {
    title: 'UI/Alert',
    component: Alert,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Alert>
            <Terminal />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                You can add components to your app using the CLI.
            </AlertDescription>
        </Alert>
    ),
};

export const Destructive: Story = {
    render: () => (
        <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                Your session has expired. Please log in again.
            </AlertDescription>
        </Alert>
    ),
};

export const WithoutIcon: Story = {
    render: () => (
        <Alert>
            <AlertTitle>Note</AlertTitle>
            <AlertDescription>
                This is a simple alert without an icon.
            </AlertDescription>
        </Alert>
    ),
};
