import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { loadEnv } from "vite-plus";
import type { ServerOptions } from "vite-plus";

export function getServerConfig(mode: string): ServerOptions {
    const env = loadEnv(mode, process.cwd());
    const appUrl = env.VITE_APP_URL;

    if (!appUrl) {
        return { host: "0.0.0.0" };
    }

    try {
        const url = new URL(appUrl);
        const certsPath = `${homedir()}/.config/orbit/certs`;
        const config: ServerOptions = { host: url.hostname };

        if (existsSync(`${certsPath}/wildcard.crt`)) {
            config.https = {
                key: readFileSync(`${certsPath}/wildcard.key`),
                cert: readFileSync(`${certsPath}/wildcard.crt`),
            };
        }

        return config;
    } catch {
        return { host: "0.0.0.0" };
    }
}
