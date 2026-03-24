import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../../storybook-utils/components/ui/input';
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldContent,
} from '../../storybook-utils/components/ui/field';

const meta: Meta<typeof Field> = {
    title: 'UI/Field',
    component: Field,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLabelAndInput: Story = {
    render: () => (
        <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" placeholder="Enter your name" />
        </Field>
    ),
};

export const WithDescription: Story = {
    render: () => (
        <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <FieldContent>
                <Input id="email" placeholder="you@example.com" />
                <FieldDescription>
                    We'll never share your email with anyone else.
                </FieldDescription>
            </FieldContent>
        </Field>
    ),
};

export const WithError: Story = {
    render: () => (
        <Field data-invalid="true">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <FieldContent>
                <Input id="password" type="password" aria-invalid="true" />
                <FieldDescription>
                    Must be at least 8 characters long.
                </FieldDescription>
                <FieldError>Password is too short.</FieldError>
            </FieldContent>
        </Field>
    ),
};

export const FieldGroupExample: Story = {
    name: 'Field Group',
    render: () => (
        <FieldGroup>
            <Field>
                <FieldLabel htmlFor="first-name">First name</FieldLabel>
                <Input id="first-name" placeholder="John" />
            </Field>
            <Field>
                <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                <Input id="last-name" placeholder="Doe" />
            </Field>
        </FieldGroup>
    ),
};
