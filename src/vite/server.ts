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
        const appCert = `${certsPath}/apps/${url.hostname}.crt`;
        const appKey = `${certsPath}/apps/${url.hostname}.key`;

        return {
            host: url.hostname,
            https: existsSync(appCert)
                ? { key: readFileSync(appKey), cert: readFileSync(appCert) }
                : undefined,
        };
    } catch {
        return { host: "0.0.0.0" };
    }
}
