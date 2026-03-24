import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup, RadioGroupItem } from '../../storybook-utils/components/ui/radio-group';
import { Label } from '../../storybook-utils/components/ui/label';

const meta: Meta<typeof RadioGroup> = {
    title: 'UI/RadioGroup',
    component: RadioGroup,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <RadioGroup defaultValue="option-1">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-1" id="option-1" />
                <Label htmlFor="option-1">Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-2" id="option-2" />
                <Label htmlFor="option-2">Option Two</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-3" id="option-3" />
                <Label htmlFor="option-3">Option Three</Label>
            </div>
        </RadioGroup>
    ),
};

export const WithDisabledOption: Story = {
    render: () => (
        <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="comfortable" />
                <Label htmlFor="comfortable">Comfortable</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="compact" />
                <Label htmlFor="compact">Compact</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="spacious" id="spacious" disabled />
                <Label htmlFor="spacious" className="opacity-50">Spacious (disabled)</Label>
            </div>
        </RadioGroup>
    ),
};
