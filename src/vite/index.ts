import { defineConfig } from "vite-plus";
import type { UserConfig } from "vite-plus";
import { getPlugins } from "./plugins.ts";
import { getServerConfig } from "./server.ts";
import type { CraftConfigOptions } from "./types.ts";

export type { CraftConfigOptions } from "./types.ts";
export { getPlugins } from "./plugins.ts";
export { getServerConfig, ssrOriginPlugin } from "./server.ts";

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
    const { lint, ...craftOptions } = options;
    const plugins = await getPlugins(craftOptions);

    return defineConfig(({ mode }) => ({
        ...(lint ? { lint } : {}),
        plugins,
        server: getServerConfig(mode),
    } as UserConfig));
}
