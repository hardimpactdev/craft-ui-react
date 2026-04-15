import type { PluginOption } from "vite-plus";

/**
 * Options for defineCraftConfig
 *
 * Each inner plugin's options are exposed as a top-level key.
 * Pass `false` to disable a plugin entirely.
 */
export interface CraftConfigOptions {
    /** Laravel Vite plugin options */
    laravel?: {
        input?: string[];
        refresh?: boolean;
        ssr?: string;
    };

    /** @inertiajs/vite plugin options, or `false` to disable */
    inertia?:
        | false
        | {
              ssr?: false | { entry?: string; port?: number };
          };

    /** @vitejs/plugin-react options */
    react?: {
        babel?: {
            plugins?: string[];
        };
    };

    /** @laravel/vite-plugin-wayfinder options, or `false` to disable */
    wayfinder?:
        | false
        | {
              formVariants?: boolean;
          };

    /**
     * Enable i18n support. When true, injects initI18n() into app entry.
     * The __ function becomes available via: import { __ } from '@hardimpactdev/craft-ui-react/i18n'
     */
    i18n?:
        | boolean
        | {
              /** Active locale (default: "en") */
              locale?: string;
              /** Fallback locale (default: "en") */
              fallbackLocale?: string;
              /** Glob pattern for lang files (default: "/lang/*.json") */
              langPath?: string;
          };

    /**
     * Agentation integration (enabled by default). Auto-mounts the Agentation
     * component in dev mode with annotation count tracking for the toolbar.
     * Requires `agentation` npm package as a dev dependency.
     * Set to `false` to disable.
     */
    agentation?: boolean;

    /** Additional Vite plugins to include */
    plugins?: PluginOption[];

    /** VitePlus lint options — passed through to defineConfig */
    lint?: {
        options?: {
            typeAware?: boolean;
            typeCheck?: boolean;
        };
    };

    /**
     * VitePlus staged command map for pre-commit hooks. Keys are glob patterns,
     * values are the shell command to run on matching staged files. Defaults
     * to `{ "*": "vp check --fix" }` — override to customize.
     */
    staged?: Record<string, string>;
}
