import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import type { PluginOption } from "vite-plus";
import type { CraftConfigOptions } from "./types.ts";
import { ssrOriginPlugin } from "./server.ts";

/**
 * Import a package from the consumer project's node_modules.
 * Reads the package's entry point from its package.json exports/main field,
 * then imports it via file:// URL for ESM compatibility.
 */
async function importFromConsumer(pkg: string) {
    const nodeModules = join(process.cwd(), "node_modules");

    // Handle subpath imports like "laravel-react-i18n/vite"
    const parts = pkg.startsWith("@")
        ? [pkg.split("/").slice(0, 2).join("/"), ...pkg.split("/").slice(2)]
        : pkg.split("/");

    const pkgName = parts[0];
    const subpath = parts.slice(1).join("/");

    if (subpath) {
        const filePath = join(nodeModules, pkgName, subpath);
        const resolved = existsSync(filePath) ? filePath : `${filePath}.js`;
        return import(pathToFileURL(resolved).href);
    }

    const pkgDir = join(nodeModules, pkgName);
    const pkgJson = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf-8"));
    const exports = pkgJson.exports?.["."];
    const entry =
        (typeof exports === "string" ? exports : exports?.import ?? exports?.default)
        ?? pkgJson.module
        ?? pkgJson.main
        ?? "index.js";

    return import(pathToFileURL(join(pkgDir, entry)).href);
}

/**
 * Assemble all Vite plugins for the Craft React stack
 */
export async function getPlugins(
    options: CraftConfigOptions,
): Promise<PluginOption[]> {
    const [
        { default: laravel },
        { default: react },
        { default: tailwindcss },
    ] = await Promise.all([
        importFromConsumer("laravel-vite-plugin"),
        importFromConsumer("@vitejs/plugin-react"),
        importFromConsumer("@tailwindcss/vite"),
    ]);

    // When VITE_APP_URL is set we're running behind orbit's Caddy reverse
    // proxy. Caddy terminates TLS; Vite stays on plain HTTP loopback. Pass
    // `detectTls: false` so laravel-vite-plugin's Herd/Valet auto-detection
    // doesn't force Vite into HTTPS mode (which would break the proxy upstream).
    const runningBehindProxy =
        typeof process.env.VITE_APP_URL === "string" && process.env.VITE_APP_URL !== "";

    const plugins: PluginOption[] = [
        ssrOriginPlugin(),
        laravel({
            input: options.laravel?.input ?? ["resources/js/app.tsx"],
            ssr: options.laravel?.ssr,
            refresh: options.laravel?.refresh ?? true,
            ...(runningBehindProxy ? { detectTls: false } : {}),
        }),
        react(options.react),
        tailwindcss(),
    ];

    if (options.inertia !== false) {
        const { default: inertia } = await importFromConsumer("@inertiajs/vite");
        plugins.push(
            inertia(
                typeof options.inertia === "object" ? options.inertia : undefined,
            ),
        );
    }

    if (options.wayfinder !== false) {
        const { wayfinder } = await importFromConsumer(
            "@laravel/vite-plugin-wayfinder",
        );
        const wayfinderOptions =
            typeof options.wayfinder === "object" ? options.wayfinder : {};
        plugins.push(
            wayfinder({
                formVariants: true,
                ...wayfinderOptions,
            }),
        );
    }

    if (options.i18n) {
        const { craftI18nPlugin } = await import("./i18n-plugin.ts");
        plugins.push(craftI18nPlugin(options.i18n));
    }

    if (options.agentation !== false) {
        const { craftAgentationPlugin } = await import("./agentation-plugin.ts");
        plugins.push(craftAgentationPlugin());
    }

    const runners = await getArtisanRunners();
    if (runners) {
        plugins.push(runners);
    }

    if (options.plugins) {
        plugins.push(...options.plugins);
    }

    return plugins;
}

async function getArtisanRunners(): Promise<PluginOption | null> {
    if (process.env.NODE_ENV !== "development") {
        return null;
    }

    try {
        const { run } = await importFromConsumer("vite-plugin-run");
        return run([
            {
                name: "waymaker",
                run: ["php", "artisan", "waymaker:generate"],
                pattern: ["app/**/Http/**/*.php"],
            },
            {
                name: "typescript",
                run: ["php", "artisan", "typescript:transform"],
                pattern: ["app/{Data,Enums}/**/*.php"],
            },
        ]);
    } catch {
        return null;
    }
}
