import type { Meta, StoryObj } from '@storybook/react-vite';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../../storybook-utils/components/ui/accordion';

const meta: Meta<typeof Accordion> = {
    title: 'UI/Accordion',
    component: Accordion,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Accordion>
            <AccordionItem>
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                    <p>Yes. It adheres to the WAI-ARIA design pattern.</p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem>
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                    <p>
                        Yes. It comes with default styles that match the other
                        components' aesthetic.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem>
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                    <p>
                        Yes. It's animated by default, but you can disable it if
                        you prefer.
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
};

export const OpenByDefault: Story = {
    render: () => (
        <Accordion defaultValue={[0]}>
            <AccordionItem>
                <AccordionTrigger>First item (open by default)</AccordionTrigger>
                <AccordionContent>
                    <p>This accordion item is expanded when the page loads.</p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem>
                <AccordionTrigger>Second item</AccordionTrigger>
                <AccordionContent>
                    <p>This item starts collapsed.</p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem>
                <AccordionTrigger>Third item</AccordionTrigger>
                <AccordionContent>
                    <p>This item also starts collapsed.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
};
