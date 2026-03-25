import { readFileSync } from "node:fs";
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
    const pkgDir = join(process.cwd(), "node_modules", pkg);
    const pkgJson = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf-8"));

    // Resolve entry: exports.".".import > exports.".".default > module > main
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

    // i18n plugin (opt-in with `i18n: true`)
    if (options.i18n) {
        const { default: i18n } = await importFromConsumer(
            "laravel-react-i18n/vite",
        );
        plugins.push(i18n());
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
