// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';
import path, { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
    stories: ['../stories/**/*.stories.@(ts|tsx)'],
    core: {
        disableWhatsNewNotifications: true,
    },
    addons: [
        '@chromatic-com/storybook',
        '@storybook/addon-themes',
        '@storybook/addon-mcp',
        {
            name: '@storybook/addon-docs',
            options: {
                codePanel: true,
            },
        },
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    viteFinal: async (config) => {
        config.plugins = config.plugins || [];
        config.plugins.push(tailwindcss());

        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...config.resolve.alias,
            '@inertiajs/react': path.resolve(__dirname, 'inertia-react-mock.ts'),
            '@': path.resolve(__dirname, '../storybook-utils'),
        };

        config.server = config.server || {};
        config.server.allowedHosts = true;
        config.server.hmr = {
            host: 'craft-ui-react.beast',
            protocol: 'wss',
            clientPort: 443,
        };

        return config;
    },
};
export default config;
