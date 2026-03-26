import { fileURLToPath } from 'node:url';
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
            '@inertiajs/react': path.resolve(__dirname, 'inertia-react-mock.tsx'),
            '@': path.resolve(__dirname, '../storybook-utils'),
        };

        // Allow external hosts when served behind a reverse proxy
        config.server = config.server || {};
        config.server.allowedHosts = true;

        return config;
    },
};
export default config;
