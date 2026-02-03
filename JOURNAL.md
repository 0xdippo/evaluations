# Dev Journal

## Logo positioning fix — Feb 3 2026

The header logo kept breaking across deploys. Three separate issues, all interacting:

### 1. Stray `package.json` in `/home/evo/`
A `package.json` and `package-lock.json` existed one directory above the project (`/home/evo/`). Next.js / Turbopack detected the extra lockfile and silently used `/home/evo/` as the workspace root instead of `/home/evo/evaluations/`. This changed how Tailwind CSS was compiled — the build output differed from a local build on a clean machine. The warning was printed every build but easy to miss:

> Next.js inferred your workspace root, but it may not be correct. We detected multiple lockfiles and selected the directory of /home/evo/package-lock.json as the root directory.

**Fix:** Either remove/rename those files, or set `turbopack.root` in `next.config.ts` (which is now done). Always build from inside `/home/evo/evaluations/`.

### 2. `vintage-texture` class overriding `position: absolute`
The `.vintage-texture` class in `globals.css` sets `position: relative`. In Tailwind v4, utility classes live inside `@layer utilities`, but custom CSS in `globals.css` is appended **outside** any layer. Rules outside a layer always win over rules inside a layer at the same specificity. So `.vintage-texture`'s `position: relative` silently overrode Tailwind's `.absolute` (`position: absolute`) on the logo div.

This masked the positioning bug below — the logo ended up in-flow by accident and appeared roughly where it should.

**Fix:** Remove `vintage-texture` from any element that also needs `position: absolute`. The class is fine on elements that are already `relative` (like the header or footer).

### 3. Logo positioning and the header height
The logo is bigger than the header at every breakpoint (logo is 7.5–10.5rem tall; header is ~5rem). The logo is meant to overflow the header downward into the hero section — both share the same `bg-navy` so the overlap is seamless. The logo image itself has significant transparent padding at top and bottom, so a small amount of overflow above the viewport (transparent pixels only) is not visible.

The logo is positioned with inline styles to prevent any future Tailwind/layer issues:

```jsx
style={{ left: "50%", top: "63%", transform: "translate(-50%, -50%)" }}
```

- `left: 50%` + `translateX(-50%)` — horizontally centers relative to the full-width header.
- `top: 63%` + `translateY(-50%)` — places the logo center at 63% of the header height. Adjust this value if the logo needs to move up or down.
- Do **not** use Tailwind classes for this positioning — use inline styles.

### Restarting the server
When restarting Next.js, kill both the wrapper and the server process:

```bash
pkill -f "next-server"
pkill -f "next start"
sleep 2
npm exec next start -- -p 3003 &
```

Just running `pkill -f "next start"` only kills the `npm exec` wrapper. The `next-server` child process survives, keeps holding port 3003, and continues serving the old build. The Cloudflare tunnel (`sdf.onl`) routes straight to port 3003, so it will serve whichever process owns that port.
