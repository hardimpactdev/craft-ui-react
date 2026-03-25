import { fileURLToPath } from 'node:url';
import { readFileSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
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

        // Use orbit's wildcard certs for HTTPS if available
        // This enables HMR WebSocket (wss://) to work behind a reverse proxy
        const certsPath = `${homedir()}/.config/orbit/certs`;
        if (existsSync(`${certsPath}/wildcard.crt`)) {
            config.server.https = {
                key: readFileSync(`${certsPath}/wildcard.key`),
                cert: readFileSync(`${certsPath}/wildcard.crt`),
            };
        }

        return config;
    },
};
export default config;
