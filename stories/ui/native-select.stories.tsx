import type { Meta, StoryObj } from '@storybook/react-vite';
import {
    NativeSelect,
    NativeSelectOption,
    NativeSelectOptGroup,
} from '../../storybook-utils/components/ui/native-select';

const meta: Meta<typeof NativeSelect> = {
    title: 'UI/NativeSelect',
    component: NativeSelect,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <NativeSelect>
            <NativeSelectOption value="">Select an option</NativeSelectOption>
            <NativeSelectOption value="apple">Apple</NativeSelectOption>
            <NativeSelectOption value="banana">Banana</NativeSelectOption>
            <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
        </NativeSelect>
    ),
};

export const Small: Story = {
    render: () => (
        <NativeSelect size="sm">
            <NativeSelectOption value="">Select a fruit</NativeSelectOption>
            <NativeSelectOption value="apple">Apple</NativeSelectOption>
            <NativeSelectOption value="banana">Banana</NativeSelectOption>
            <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
        </NativeSelect>
    ),
};

export const WithOptGroups: Story = {
    render: () => (
        <NativeSelect>
            <NativeSelectOption value="">Choose a vehicle</NativeSelectOption>
            <NativeSelectOptGroup label="Cars">
                <NativeSelectOption value="sedan">Sedan</NativeSelectOption>
                <NativeSelectOption value="suv">SUV</NativeSelectOption>
                <NativeSelectOption value="coupe">Coupe</NativeSelectOption>
            </NativeSelectOptGroup>
            <NativeSelectOptGroup label="Trucks">
                <NativeSelectOption value="pickup">Pickup</NativeSelectOption>
                <NativeSelectOption value="semi">Semi</NativeSelectOption>
            </NativeSelectOptGroup>
        </NativeSelect>
    ),
};
