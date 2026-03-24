import type { Preview } from '@storybook/react-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import React from 'react';
import { TooltipProvider } from '../storybook-utils/components/ui/tooltip';
import '../styles/globals.css';

const withTooltipProvider = (Story: React.ComponentType) => (
    <TooltipProvider delayDuration={0}>
        <Story />
    </TooltipProvider>
);

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        withTooltipProvider,
        withThemeByClassName({
            themes: {
                light: '',
                dark: 'dark',
            },
            defaultTheme: 'light',
        }),
    ],
};

export default preview;
