import type { Meta, StoryObj } from '@storybook/react-vite';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '../../storybook-utils/components/ui/combobox';

const meta: Meta<typeof Combobox> = {
    title: 'UI/Combobox',
    component: Combobox,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const frameworks = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid' },
];

export const Default: Story = {
    render: () => (
        <Combobox>
            <ComboboxInput placeholder="Select a framework..." />
            <ComboboxContent>
                <ComboboxList>
                    <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
                    {frameworks.map((framework) => (
                        <ComboboxItem
                            key={framework.value}
                            value={framework.value}
                        >
                            {framework.label}
                        </ComboboxItem>
                    ))}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    ),
};

export const WithClear: Story = {
    render: () => (
        <Combobox>
            <ComboboxInput
                placeholder="Select a framework..."
                showClear
            />
            <ComboboxContent>
                <ComboboxList>
                    <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
                    {frameworks.map((framework) => (
                        <ComboboxItem
                            key={framework.value}
                            value={framework.value}
                        >
                            {framework.label}
                        </ComboboxItem>
                    ))}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    ),
};
