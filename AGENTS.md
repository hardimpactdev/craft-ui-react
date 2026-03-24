Custom shadcn registry + Storybook for React. Provides craft-specific layout/navigation components for Laravel + Inertia apps, plus a full preview of all shadcn UI components.

## Architecture

This repo serves three roles from one codebase:

| Role | What | Command |
|------|------|---------|
| **Registry** | shadcn-compatible JSON registry — installable via CLI | `npm run build` → `npm run serve` |
| **Storybook** | Visual preview of all components (craft + shadcn) | `npm run dev` |
| **Package** (planned) | Vite plugin, shared runtime utils | `src/` directory |

## How the registry works

Components follow the [shadcn registry format](https://ui.shadcn.com/docs/registry). Source files live in `registry/new-york-v4/`. Running `npm run build` (shadcn build) reads `registry.json` and outputs individual JSON files to `public/r/` with inlined source content.

Consumer projects configure `components.json`:
```json
{
    "registries": {
        "@craft": "https://craft-ui.dev/r/{name}.json"
    }
}
```

Then install with:
```bash
npx shadcn@latest add @craft/app-sidebar-layout
```

This resolves the full dependency tree — craft components from `@craft`, shadcn base components from upstream `@shadcn`. Everything gets written into the consumer's project. They own the files.

## Directory structure

```
registry/                        # Registry source (what gets built to JSON)
  new-york-v4/
    components/                  # App components (17) — app-shell, nav-main, etc.
    blocks/                      # Layout blocks (8) — sidebar layout, auth layouts, etc.
    hooks/                       # React hooks (5) — use-appearance, use-initials, etc.
    ui/                          # UI primitives (1) — placeholder-pattern
    lib/                         # Utilities — types.ts

storybook-utils/                 # Storybook runtime (mirrors @/ import structure)
  components/ui/                 # shadcn base components (54) — installed via shadcn CLI
  components/                    # Re-exports of registry components
  hooks/                         # Re-exports of registry hooks
  lib/                           # cn() utility
  types/                         # Re-exports of registry types

stories/                         # Storybook stories (79 total)
  ui/                            # shadcn UI component stories (54)
  *.stories.tsx                  # Craft component + layout stories (25)

public/r/                        # Built registry output (JSON files, served to consumers)
registry.json                    # Registry manifest
components.json                  # shadcn config (targets storybook-utils/ for base installs)
styles/globals.css               # Theme + Tailwind for Storybook
.storybook/                      # Storybook config + Inertia mock
```

## Key design decisions

### shadcn model (option B)
Base UI components come from upstream shadcn. The `@craft` registry only contains what shadcn doesn't have — layout shells, navigation, app-specific patterns. This avoids maintaining forks of 50+ base components.

### Base UI over Radix
All shadcn components use [Base UI](https://base-ui.com/) primitives (`@base-ui/react`), not Radix. Set via `"style": "base-nova"` in components.json. Same component API, different underlying library.

### Registry dependencies
Cross-references between craft items use `@craft/` prefix (e.g., `@craft/app-shell`). Bare names resolve to upstream shadcn (e.g., `sidebar`, `button`). This is how the CLI knows which registry to fetch from.

### Storybook aliases
The `@` alias points to `storybook-utils/` via `.storybook/main.ts`. Registry components import from `@/components/ui/sidebar` etc. — Storybook resolves this to the actual shadcn components in `storybook-utils/components/ui/`. `@inertiajs/react` is aliased to a mock (`.storybook/inertia-react-mock.ts`).

## Adding a new craft component

1. Create the component in `registry/new-york-v4/components/my-component.tsx`
2. Add the item to `registry.json` with `name`, `type`, `dependencies`, `registryDependencies`, `files`
3. Use `@craft/` prefix for cross-references to other craft items, bare names for shadcn items
4. Create a re-export in `storybook-utils/components/my-component.tsx`
5. Create a story in `stories/my-component.stories.tsx`
6. Run `npm run build` to rebuild the registry

## Adding a new shadcn base component

```bash
npx shadcn@latest add component-name --yes
```

This installs into `storybook-utils/components/ui/`. Then fix imports:
```bash
find storybook-utils -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from "storybook-utils/|from "@/|g'
```

Create a story in `stories/ui/component-name.stories.tsx`.

## Theme

Uses oklch color system with CSS variables. Light/dark mode via `.dark` class. Theme defined in `styles/globals.css`. Animations from `tw-animate-css`.

## Design principles

Inherited from craft-ui. Calm, clean interfaces:
- Subtle shadows (`shadow-xs`), soft zinc borders
- No shadows in dark mode
- Weight over color for hierarchy
- Consistent spacing and radii
- Base height 40px (h-10), base radius 8px (rounded-lg)

## Tech stack

- React 19, TypeScript
- Base UI primitives (`@base-ui/react`)
- Tailwind CSS v4.2 with oklch colors
- Storybook 10 with MCP addon
- shadcn CLI for registry build + base component installs
- Components are Inertia-aware (`@inertiajs/react` for Link, usePage)
