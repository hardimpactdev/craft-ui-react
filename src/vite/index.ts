import { defineConfig } from "vite-plus";
import type { UserConfig } from "vite-plus";
import { getPlugins } from "./plugins.ts";
import type { CraftConfigOptions } from "./types.ts";

export type { CraftConfigOptions } from "./types.ts";
export { getPlugins } from "./plugins.ts";

/**
 * Create a complete Vite config for a Craft React app.
 *
 * Returns a Promise<UserConfig> — Vite's defineConfig supports async functions.
 * The async is needed because plugin imports resolve from the consumer's node_modules.
 *
 * @example
 * import { defineCraftConfig } from '@hardimpactdev/craft-ui-react/vite';
 * export default defineCraftConfig();
 */
export async function defineCraftConfig(options: CraftConfigOptions = {}) {
    const { lint, staged, ...craftOptions } = options;
    const plugins = await getPlugins(craftOptions);

    return defineConfig(() => ({
        ...(lint ? { lint } : {}),
        staged: staged ?? { "*": "vp check --fix" },
        plugins,
        server: {
            watch: {
                // Laravel vendor/ can contain recursive symlinks (e.g.
                // orchestra/testbench-core laravel/vendor -> vendor) that crash
                // the dev watcher with ELOOP once a path-repo package is
                // symlinked in. vendor/ is never part of the Vite module graph.
                ignored: ["**/vendor/**"],
            },
        },
    } as UserConfig));
}
