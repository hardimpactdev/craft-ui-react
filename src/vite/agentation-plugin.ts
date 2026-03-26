import type { Plugin } from "vite-plus";

const VIRTUAL_MODULE_ID = "virtual:craft-agentation";
const RESOLVED_VIRTUAL_MODULE_ID = "\0" + VIRTUAL_MODULE_ID;

/**
 * The agentation runtime — mounts the Agentation component, wires up
 * annotation count callbacks, and responds to toolbar state requests.
 *
 * Requires `agentation` npm package as a dev dependency in the consumer project.
 */
const AGENTATION_RUNTIME = `
function injectStyles() {
    if (typeof document === "undefined") return;
    const style = document.createElement("style");
    style.id = "craft-agentation-styles";
    style.textContent = \`
        [data-agentation-toolbar] { display: none !important; }
        [data-agentation-toolbar].agentation-visible { display: block !important; }
        #laravel-toolbar-shadow-host.toolbar-external-active {
            opacity: 0 !important;
            pointer-events: none !important;
            transition: opacity 0.15s ease;
        }
    \`;
    document.head.appendChild(style);
}

function syncCount(count) {
    window.dispatchEvent(
        new CustomEvent("toolbar:agentation:state", {
            detail: { annotationCount: count },
        }),
    );
}

function readAnnotationCount() {
    try {
        const key = "feedback-annotations-" + window.location.pathname;
        const stored = JSON.parse(localStorage.getItem(key) ?? "[]");
        return Array.isArray(stored) ? stored.length : 0;
    } catch {
        return 0;
    }
}

export function mountAgentation() {
    injectStyles();

    let count = readAnnotationCount();

    window.addEventListener("toolbar:agentation:request-state", () => {
        syncCount(count);
    });

    import("agentation").then(({ Agentation }) => {
        import("react-dom/client").then(({ createRoot }) => {
            import("react/jsx-runtime").then(({ jsx }) => {
                const container = document.createElement("div");
                container.id = "agentation-root";
                document.body.appendChild(container);
                createRoot(container).render(
                    jsx(Agentation, {
                        onAnnotationAdd: () => syncCount(++count),
                        onAnnotationDelete: () => syncCount(--count),
                        onAnnotationsClear: () => { count = 0; syncCount(0); },
                    }),
                );
            });
        });
    });
}
`;

const INIT_CODE = `
import { mountAgentation } from "virtual:craft-agentation";
if (typeof window !== "undefined") {
    mountAgentation();
}
`;

/**
 * Vite plugin that provides Agentation integration:
 * 1. A virtual module with mountAgentation()
 * 2. An alias so "@hardimpactdev/craft-ui-react/agentation" resolves to it
 * 3. Auto-injection of mountAgentation() into the app entry point (dev only)
 */
export function craftAgentationPlugin(): Plugin {
    return {
        name: "craft-agentation",
        enforce: "pre",

        config() {
            return {
                resolve: {
                    alias: {
                        "@hardimpactdev/craft-ui-react/agentation": VIRTUAL_MODULE_ID,
                    },
                },
            };
        },

        resolveId(id) {
            if (id === VIRTUAL_MODULE_ID || id === "@hardimpactdev/craft-ui-react/agentation") {
                return RESOLVED_VIRTUAL_MODULE_ID;
            }
        },

        load(id) {
            if (id === RESOLVED_VIRTUAL_MODULE_ID) {
                return AGENTATION_RUNTIME;
            }
        },

        transform(code, id) {
            if (!id.match(/resources\/js\/app\.(tsx|ts|jsx|js)$/)) {
                return null;
            }
            return { code: INIT_CODE + code, map: null };
        },
    };
}
