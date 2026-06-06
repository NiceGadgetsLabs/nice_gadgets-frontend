# Nice Gadgets

## Getting Started

### Install dependencies

```bash
npm install
```

### Run dev server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview build

```bash
npm run preview
```

---

## Scripts

| Command                | Description                   |
| ---------------------- | ----------------------------- |
| `npm run dev`          | Dev server with auto-open     |
| `npm run build`        | Type check + production build |
| `npm run preview`      | Preview production build      |
| `npm run typecheck`    | TypeScript type check         |
| `npm run lint`         | ESLint + Stylelint            |
| `npm run lint:fix`     | Auto-fix lint errors          |
| `npm run format`       | Prettier format               |
| `npm run format:check` | Check formatting              |
| `npm run fix-style`    | Prettier + lint fix           |

---

## Git Workflow

### Branches

`main` — protected, direct push is forbidden. All changes go through pull requests.

For every feature, fix or task — create a separate branch.

### Pull Requests

1. Push your branch
2. Open PR into `main`
3. Make sure lint and build pass
4. Get review → merge

---

## Commit Convention

Commits follow the [Conventional Commits](https://www.conventionalcommits.org/) standard. Commitlint and Husky enforce this automatically on every commit.

### Format

```
<type>: <short description>
```

### Types

| Type       | When to use                               |
| ---------- | ----------------------------------------- |
| `feat`     | New feature                               |
| `fix`      | Bug fix                                   |
| `chore`    | Configs, deps, tooling                    |
| `style`    | Formatting, no logic changes              |
| `refactor` | Refactoring without new features or fixes |
| `docs`     | Documentation only                        |
| `test`     | Tests                                     |
| `perf`     | Performance improvements                  |
| `revert`   | Revert a commit                           |

### Examples

```bash
git commit -m "feat: add product card component"
git commit -m "fix: broken layout on mobile"
git commit -m "chore: update vite to v8"
git commit -m "refactor: extract header into separate component"
git commit -m "docs: update readme"
```
