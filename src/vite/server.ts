import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { loadEnv } from "vite-plus";
import type { PluginOption, ServerOptions } from "vite-plus";

export function getServerConfig(mode: string): ServerOptions {
    const env = loadEnv(mode, process.cwd());
    const appUrl = env.VITE_APP_URL;

    if (!appUrl) {
        return { host: "0.0.0.0" };
    }

    try {
        const url = new URL(appUrl);
        const certsPath = `${homedir()}/.config/orbit/certs`;
        const appCert = `${certsPath}/apps/${url.hostname}.crt`;
        const appKey = `${certsPath}/apps/${url.hostname}.key`;

        const hasOrbitCerts = existsSync(appCert);

        return {
            host: url.hostname,
            hmr: {
                host: url.hostname,
                ...(hasOrbitCerts ? { clientPort: 443 } : {}),
            },
            https: hasOrbitCerts
                ? { key: readFileSync(appKey), cert: readFileSync(appCert) }
                : undefined,
            ...(hasOrbitCerts ? { origin: appUrl } : {}),
        };
    } catch {
        return { host: "0.0.0.0" };
    }
}

/**
 * Vite plugin that rewrites localhost URLs in Inertia SSR responses.
 *
 * @inertiajs/vite uses server.resolvedUrls.local[0] to build CSS hrefs
 * during SSR, which resolves to localhost. Vite wraps the server object
 * in a Proxy, making it impossible to reliably patch resolvedUrls.
 *
 * Instead, this plugin intercepts the SSR endpoint response and replaces
 * localhost URLs with the configured hostname.
 */
export function ssrOriginPlugin(): PluginOption {
    return {
        name: "craft:ssr-origin",
        configureServer(server) {
            const host = server.config.server.host;
            if (!host || typeof host !== "string") return;

            server.middlewares.use("/__inertia_ssr", (req, res, next) => {
                const originalWrite = res.write.bind(res);
                const originalEnd = res.end.bind(res);

                // biome-ignore lint: overriding res.write for interception
                res.write = function (chunk: any, ...args: any[]) {
                    if (typeof chunk === "string") {
                        chunk = chunk.replace(
                            /https?:\/\/localhost(:\d+)/g,
                            `https://${host}$1`,
                        );
                    } else if (Buffer.isBuffer(chunk)) {
                        const str = chunk.toString();
                        if (str.includes("localhost")) {
                            chunk = Buffer.from(
                                str.replace(
                                    /https?:\/\/localhost(:\d+)/g,
                                    `https://${host}$1`,
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
                            /https?:\/\/localhost(:\d+)/g,
                            `https://${host}$1`,
                        );
                    } else if (Buffer.isBuffer(chunk)) {
                        const str = chunk.toString();
                        if (str.includes("localhost")) {
                            chunk = Buffer.from(
                                str.replace(
                                    /https?:\/\/localhost(:\d+)/g,
                                    `https://${host}$1`,
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
