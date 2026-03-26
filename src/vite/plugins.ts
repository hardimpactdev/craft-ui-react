import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import type { PluginOption } from "vite-plus";
import type { CraftConfigOptions } from "./types.ts";

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
        // Direct file import — resolve from node_modules
        const filePath = join(nodeModules, pkgName, subpath);
        // Try with .js extension if no extension provided
        const resolved = existsSync(filePath) ? filePath : `${filePath}.js`;
        return import(pathToFileURL(resolved).href);
    }

    // Package root import — read package.json for entry point
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

    const plugins: PluginOption[] = [
        laravel({
            input: options.laravel?.input ?? ["resources/js/app.tsx"],
            ssr: options.laravel?.ssr,
            refresh: options.laravel?.refresh ?? true,
        }),
        react(options.react),
        tailwindcss(),
    ];

    // Inertia plugin (opt-out with `inertia: false`)
    if (options.inertia !== false) {
        const { default: inertia } = await importFromConsumer("@inertiajs/vite");
        plugins.push(
            inertia(
                typeof options.inertia === "object" ? options.inertia : undefined,
            ),
        );
    }

    // Wayfinder plugin (opt-out with `wayfinder: false`)
    if (options.wayfinder !== false) {
        const { wayfinder } = await importFromConsumer(
            "@laravel/vite-plugin-wayfinder",
        );
        plugins.push(
            wayfinder(
                typeof options.wayfinder === "object"
                    ? options.wayfinder
                    : undefined,
            ),
        );
    }

    // i18n (opt-in with `i18n: true` or `i18n: { locale: 'nl' }`)
    if (options.i18n) {
        const { craftI18nPlugin } = await import("./i18n-plugin.ts");
        plugins.push(craftI18nPlugin(options.i18n));
    }

    // Agentation (enabled by default, opt-out with `agentation: false`)
    if (options.agentation !== false) {
        const { craftAgentationPlugin } = await import("./agentation-plugin.ts");
        plugins.push(craftAgentationPlugin());
    }

    // Artisan runners (dev only)
    const runners = await getArtisanRunners();
    if (runners) {
        plugins.push(runners);
    }

    // User's additional plugins
    if (options.plugins) {
        plugins.push(...options.plugins);
    }

    return plugins;
}

/**
 * Auto-run artisan commands on file changes during development
 */
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
