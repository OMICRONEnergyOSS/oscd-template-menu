# Menu template modernization worklog

## Goal and scope

Modernize the existing menu-plugin template primarily by adopting
`@omicronenergy/oscd-tooling`. Preserve its plugin identity, exports and runtime
behavior. Make it a sound starting point for a later combined editor/menu
scaffold.

- Workspace: `/Users/stee/code/OMICRONEnergyOSS/oscd-template-menu`.
- Implementation scope: tooling, dependency declarations, hooks, directly
  affected tests and documentation.
- No unrelated runtime redesign, release/version changes, formatting sweep,
  staging, commits or pushes.
- The later `oscd-plugin-scafold` copy and skill updates are not part of this
  implementation phase. Confirm its final name and destination before creating
  it; provide both plugin kinds and document removal of unused files/references.
- `oscd-editor-template` is the DataTypeTemplates editor, not a scaffold.

## Resources

| Resource | Location / revision | Purpose |
|---|---|---|
| Template | Current workspace, `bf1cec4b1b6a9f407938afee0fe88be05350d100` | Clean working tree before this planning document |
| Tooling recipe | `~/.agents/skills/plugin-to-oscd-tooling/` | Migration procedure and known pitfalls |
| Shared instructions | `~/.agents/agent-instructions.md` | Approval, worklog and Git boundaries |
| Published tooling | `@omicronenergy/oscd-tooling@0.0.8` | Version queried from npm; published README read from archive without installation |
| Editor reference | `/Users/stee/code/stee-re/oscd-editor-sld` | Thin tooling configuration and shell-scoped demo registration |
| Generic log template | `~/.agents/reference/worklog-template.md` | Structure for this tooling-only task |
| Implementation | `src/oscd-template-menu.ts`, `src/foundation/nsdoc.ts` | Existing runtime to preserve |
| Tests | `src/oscd-template-menu.spec.ts`, `src/oscd-template-menu.test.ts` | Unit and visual-group placeholder tests |
| Demo | `demo/index.html`, `demo/plugins.js`, `demo/sample.scd` | Direct dependencies and local/bundled smoke checks |
| Local tooling | `package.json`, `tsconfig.json`, ESLint/Rollup/WTR/WDS/commitlint configs, `.husky/` | Replace duplicated tooling with shared defaults |
| Manifest | `custom-elements.json`, package `customElements` field and `analyze` script | Owner decision required on retention |

## Technical analysis

The template currently duplicates the full lint/build/test/deploy stack.
Published tooling 0.0.8 provides corresponding `oscd` commands and shared
configuration, including consumer overrides when genuinely needed.

Keep all directly imported runtime/demo/test packages declared. In particular,
the demo imports the scoped-registry polyfill, unit tests import
`@open-wc/testing`, and the visual test imports `@web/test-runner-commands`.
Inspect remaining source imports before pruning dependencies.

The current unit test calls `run()`, which opens an alert, but only asserts
that `docName` remains unchanged. The visual test has its visual assertion
commented out and uses a custom `window.process` setup. Establish a safe focused
test for the existing alert behavior if those placeholders block the tooling
migration; do not claim they provide meaningful regression coverage as-is.

Shared tooling changes formatting policy from Prettier to its ESLint policy.
Do not run auto-format or silently expand into unrelated style changes.
Retain a thin ESLint wrapper for editor integration.

`prepare: oscd install-hooks` writes `.githooks/` and updates local Git
`core.hooksPath`. Approval must explicitly include this local configuration
side effect; it does not authorize staging or history/remote changes.

Potential compatibility points: shared TypeScript options, runner/browser
versions, visual harness differences, demo asset bundling and direct dependency
resolution. Inspect workflow/browser-image compatibility before deciding that
existing workflows need no changes.

## Questions and decisions

| ID | Question / options | Answer / rationale | Status |
|---|---|---|---|
| DP-1 | Retain or remove Custom Elements Manifest generation? | Owner chose removal: delete `custom-elements.json`, remove the package `customElements` field and `analyze` script, and remove generation from build/start scripts. Remove analyzer-only configuration/dependencies after checking references. | decided |
| DP-2 | Permit generated hooks and local `core.hooksPath` update during install/prepare? | Owner approved plan including local Git hook configuration | decided |

## Implementation plan

| Step | Changes | Prerequisites | Verification / exit criteria |
|---|---|---|---|
| 1 | Inspect source/configs; populate plan and resolve decisions | Existing checkout confirmed | Saved worklog; owner decisions recorded |
| 2 | Add `@omicronenergy/oscd-tooling` at `^0.0.8`; replace scripts/configs; prune tool-only dependencies and dead config; retain direct imports and selected manifest policy | Explicit approval of plan and hook side effects | Install succeeds; thin config resolves; no obsolete toolchain configuration |
| 3 | Validate menu behavior and tooling; fix tightly coupled incompatibilities; update README | Step 2 | Type-check, lint (no fixes), build, bundle and tests succeed; local and bundled demo smoke checks |

Commands planned, not yet run: `npm install`, `npx tsc --noEmit`,
`npm run lint`, `npm run build`, `npm run bundle`, `npm test`,
`npm run test:visual` where meaningful, `git config --get core.hooksPath`,
and temporary local/bundled server smoke checks. Stop temporary servers after
checks. Inspect generated output and package file selection.

## Plan approval

- Status: approved by owner: "Approve plan, including local Git hook configuration".
- Hook/configuration permission: approved for this checkout.
- Next action: implement and verify tooling modernization.
- Do not duplicate a repository or change shared skills in this phase.

## Step Status

| Step | Status | Evidence / next action |
|---|---|---|
| 1 - Planning | done | Manifest removal selected; plan including hook setup approved |
| 2 - Tooling migration | done | Shared tooling installed; hooks and manifest removal applied |
| 3 - Verification/documentation | done | Local checks, both demo modes and README completed |

## Step 2 Completion Summary

### Files transformed

- `package.json`, `package-lock.json` — adopt tooling `^0.0.8`, delegate
  scripts to `oscd`, remove duplicated tools and dead configuration, retain
  directly imported demo/test packages. Lockfile updated with npm, not deleted.
- `tsconfig.json`, `eslint.config.js` — thin shared-config wrappers.
- `.githooks/pre-commit`, `.githooks/commit-msg` — generated by tooling;
  checkout-local `core.hooksPath` now points to `.githooks`.
- Removed local Rollup/WTR/WDS/commitlint configs and tracked `.husky` hooks.
- `custom-elements.json` and its package/script references — removed per DP-1.

### Decision points applied

- DP-1: remove manifest generation.
- DP-2: owner explicitly approved hook generation and local Git configuration.
- Shared defaults now run Chromium rather than the old three-browser matrix.
  No runtime code was changed.

## Step 3 Completion Summary

### Issues found during verification (all fixed)

1. **One shared lint violation:** `src/oscd-template-menu.test.ts` needed
   parentheses around a callback parameter. Applied that single syntax-only
   change manually; no formatting sweep or auto-fix command ran.

### Files transformed

- `README.md` — describe the menu template, shared commands/configuration,
  hook side effects, manifest removal, Chromium default, optional formatting,
  network-dependent demo features and actual placeholder-test limitations.

### Verification

- `npm install --no-audit --no-fund` — passed, including hook installation.
  npm reported deprecated transitive packages and uncovered dependency install
  scripts under the machine's allow-scripts policy; no blanket script approval
  was given. Build, bundling and browser execution subsequently succeeded.
- `git config --get core.hooksPath` — `.githooks`; both generated hooks read.
- `npx tsc --noEmit` — passed before and after verification.
- `npm run lint` — initially failed on the one callback above; passed after fix.
- `npm run build`, `npm test`, `npm run test:visual`, `npm run bundle` —
  passed. Unit and visual groups each execute one starter test; the latter
  contains no active screenshot assertion. Tooling emits a non-fatal macOS
  pixel-difference diagnostic.
- `npm start`, `npm run start:bundle` — temporary servers responded over HTTP.
  Headless Playwright loaded each real demo, confirmed sample document and
  scoped menu registration/instantiation, and exercised the existing alert
  behavior. Both `run()` branches checked in the development demo.
- Smoke-check harness corrections: `oscd start` rejects WDS `--port` options,
  so used supported defaults. Tested the shell-instantiated scoped element
  rather than constructing its class directly. Dismissed modal dialogs via
  handlers to avoid blocking evaluation. These were check-harness issues,
  not plugin changes. All temporary servers/check processes stopped.
- `npm pack --dry-run --ignore-scripts --json` — expected entry/declaration/demo
  files present, test files absent. Initial dry-run without `--ignore-scripts`
  ran the approved prepare hook again and polluted JSON output; corrected check
  passed without generating an archive.
- `npm ls --depth=0`, `git diff --check` — passed.

### Known limitations preserved

- Unit and visual files remain starter placeholders, not substantive regression
  coverage; the README states this explicitly.
- Existing `run()` alert text includes the typo `Loaed`; preserved runtime
  behavior rather than making an unrelated correction.
- Workflows already delegate to shared GitHub workflows and were left intact.
  Local execution was checked; remote CI, publishing and deployment were not run.
- No staging, commits, remote writes or releases performed.
- Owner subsequently confirmed both starters must start at `0.0.0` everywhere.
  Package version, both root lockfile version fields and release-please manifest
  already agree at `0.0.0` in both repositories; verified with Node assertions.
  No forced `release-as` override exists and no version-file correction was
  needed. Dependency versions remain unchanged by this requirement.

## Resume and remaining work

Menu-template modernization is complete locally and uncommitted. Review the
diff before using it as the basis of the combined scaffold. The published
tooling README was read and the template's clean baseline confirmed before
implementation.

After modernization, separately plan the combined editor/menu scaffold and
the migration-skill guidance to purge whichever plugin kind is not needed,
including exports, demo entries, tests and documentation references.

The user confirmed that the migration skills must identify the combined
scaffold by repository name and GitHub URL and mandate it as the basis for
the target plugin. Record the verified canonical URL when that repository is
established; do not invent an existing remote or claim it has been published.
Keep working local paths/revisions in each migration worklog's Resources
section. Replace old template-specific instructions consistently rather than
adding a competing recommendation.

The owner supplied the actual remote setup instructions, correcting the
previous spelling confirmation. The canonical repository is
`https://github.com/OMICRONEnergyOSS/oscd-plugin-scafold` (one "f").
GitHub integration confirms that this repository exists and is empty (409,
no default branch yet). The earlier authentication/404 failures concerned the
different `oscd-plugin-scaffold` name and are not blockers for this repository.
Do not create another remote or run the supplied commit/push example.

## Combined scaffold phase - proposed plan

### Goal and scope

Create the requested editor/menu starter as a sibling folder:
`/Users/stee/code/OMICRONEnergyOSS/oscd-plugin-scafold`.
This path was not present in the inspected parent listing; confirm it as the
destination before creation. Use the modernized menu template as the basis,
not the DataTypeTemplates editor. No Git initialization, staging, commits,
remote configuration or pushes in this phase.

### Technical plan

1. Copy only maintained template inputs: package metadata, shared tooling
   configuration, relevant demo assets, license and reusable workflow files.
   Do not copy `.git`, `node_modules`, `dist`, coverage, release state,
   historical changelog, generated manifest or this task's worklog. Create a
   fresh populated worklog in the new destination recording this phase's
   resources, decisions and approval.
2. Provide `src/oscd-editor-scafold.ts` and `src/oscd-menu-scafold.ts`, each a
   scoped Lit plugin with its own export, demo registration and focused test.
   Editor displays document context; menu retains the simple on-demand alert
   example. No XML mutations or domain-specific editing example.
3. Give the package two explicit subpath exports instead of an ambiguous default
   plugin export. Add a thin local Rollup configuration using shared defaults
   to bundle both entry points; tooling's default assumes a single entry named
   after the package. Preserve both plugins in the demo alongside Source Editor.
4. Document both entry points and exact pruning instructions for editor-only
   or menu-only targets, including source/specs, exports, bundle entries, demo
   imports/registrations/entries and documentation. Remove menu-template-only
   placeholders and unused copied helpers; retain no pretend visual assertions.
5. Update `plugin-migration` planning/scaffolding guidance and
   `adapt-menu-template` plus its references. Keep the existing skill name for
   compatibility, but make it handle selecting the proper plugin kind rather
   than requiring every editor to be converted from a menu. Identify the
   canonical name/URL, require this scaffold as the migration basis, record its
   local path/revision in Resources, and purge the unused plugin and references.
   Planning may inspect the scaffold but must not materialize it before approval.
6. Verify install, type-check, lint without auto-fix, build, both bundled entry
   outputs/exports, focused unit tests and both actual demo plugins. Validate
   skill shape/word budgets and internal links. Record checks and update the
   presentation handoff.

### Decisions and approval

- Canonical repository: `OMICRONEnergyOSS/oscd-plugin-scafold`, verified empty.
- Proposed local destination: sibling folder named exactly as the remote.
- Dependencies: same shared tooling range; direct imports remain declared.
- This phase has no Git configuration side effects: install with
  `npm install --ignore-scripts` in the non-Git workspace and defer hook
  installation to a real checkout. Keep `prepare` documented for future users.
- Status: owner approved: "Approve plan and sibling-folder destination".
- Implementation worklog:
  `/Users/stee/code/OMICRONEnergyOSS/oscd-plugin-scafold/worklog.md`.
- Phase completed locally: both entry points/demo modes verified, canonical
  scaffold and pruning guidance applied to migration/adaptation skills.
  See that worklog for exact checks and remaining publishing/rehearsal limits.
  No scaffold Git metadata, commit or push created.
