import { loadEnv } from "vite-plus";
import type { PluginOption, ServerOptions } from "vite-plus";

/**
 * Produce a Vite `server` config that works identically on:
 *
 *   - Laravel Herd / Valet (dev-machine == browsing-machine): Vite serves
 *     HTTPS locally via Herd/Valet's cert — configured by laravel-vite-plugin's
 *     `detectTls` option, so this function returns `{ host: "127.0.0.1" }` and
 *     stays out of the way.
 *   - Orbit (dev-machine != browsing-machine): Caddy terminates TLS at the
 *     workspace domain on :443 and proxies /@vite/*, /resources/*, HMR
 *     websockets, etc. to plain HTTP on Vite's loopback port. Vite binds to
 *     127.0.0.1 (no remote interface needed) and `server.origin` strips the
 *     port from the hot file so emitted asset URLs go through Caddy.
 *
 * Orbit signals itself via `VITE_APP_URL=https://<workspace-domain>`. When
 * unset (Herd/Valet/plain local), this helper does nothing opinionated.
 */
export function getServerConfig(mode: string): ServerOptions {
    const env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    const appUrl = env.VITE_APP_URL;

    if (!appUrl) {
        return { host: "127.0.0.1" };
    }

    const url = new URL(appUrl);

    return {
        host: "127.0.0.1",
        origin: appUrl,
        hmr: {
            host: url.hostname,
            protocol: "wss",
            clientPort: 443,
        },
    };
}

/**
 * Vite plugin that rewrites localhost URLs in Inertia SSR responses.
 *
 * @inertiajs/vite uses server.resolvedUrls.local[0] to build CSS hrefs
 * during SSR, which resolves to localhost. Vite wraps the server object
 * in a Proxy, making it impossible to reliably patch resolvedUrls.
 *
 * Instead, this plugin intercepts the SSR endpoint response and replaces
 * localhost URLs with the configured workspace origin.
 */
export function ssrOriginPlugin(): PluginOption {
    return {
        name: "craft:ssr-origin",
        configureServer(server) {
            const origin = server.config.server.origin;
            if (!origin || typeof origin !== "string") return;
            const { hostname } = new URL(origin);

            server.middlewares.use("/__inertia_ssr", (req, res, next) => {
                const originalWrite = res.write.bind(res);
                const originalEnd = res.end.bind(res);

                // biome-ignore lint: overriding res.write for interception
                res.write = function (chunk: any, ...args: any[]) {
                    if (typeof chunk === "string") {
                        chunk = chunk.replace(
                            /https?:\/\/localhost(:\d+)?/g,
                            `https://${hostname}$1`,
                        );
                    } else if (Buffer.isBuffer(chunk)) {
                        const str = chunk.toString();
                        if (str.includes("localhost")) {
                            chunk = Buffer.from(
                                str.replace(
                                    /https?:\/\/localhost(:\d+)?/g,
                                    `https://${hostname}$1`,
                                ),
                            );
                        }
                    }
                    return originalWrite(chunk, ...args);
                };

                // biome-ignore lint: overriding res.end for interception
                res.end = function (chunk: any, ...args: any[]) {
                    if (typeof chunk === "string") {
                        chunk = chunk.replace(
                            /https?:\/\/localhost(:\d+)?/g,
                            `https://${hostname}$1`,
                        );
                    } else if (Buffer.isBuffer(chunk)) {
                        const str = chunk.toString();
                        if (str.includes("localhost")) {
                            chunk = Buffer.from(
                                str.replace(
                                    /https?:\/\/localhost(:\d+)?/g,
                                    `https://${hostname}$1`,
                                ),
                            );
                        }
                    }
                    return originalEnd(chunk, ...args);
                };

                next();
            });
        },
    };
}
