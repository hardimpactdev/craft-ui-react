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

    /** Enable i18n support (laravel-react-i18n), default: false */
    i18n?: boolean;

    /** Additional Vite plugins to include */
    plugins?: PluginOption[];

    /** VitePlus lint options — passed through to defineConfig */
    lint?: {
        options?: {
            typeAware?: boolean;
            typeCheck?: boolean;
        };
    };
}
