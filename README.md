[![Tests](https://github.com/OMICRONEnergyOSS/oscd-template-menu/actions/workflows/test.yml/badge.svg)](https://github.com/OMICRONEnergyOSS/oscd-template-menu/actions/workflows/test.yml) ![NPM Version](https://img.shields.io/npm/v/@omicronenergy/oscd-template-menu)

# OpenSCD Menu Plugin Template

## `<oscd-template-menu>`

## What is this?

This is a minimal [OpenSCD](https://openscd.org) menu-plugin template.
Its `run()` method displays an example alert. The demo registers the plugin in
the shell's scoped registry alongside Open File and Save File menu plugins.

Install dependencies with `npm install`, then run `npm start` to open the demo.
Installation also generates `.githooks/` and configures this checkout's local
Git `core.hooksPath` to use them.

## Linting and formatting

To scan the project using the shared ESLint rules, run

```bash
npm run lint
```

To apply ESLint's automatic fixes, run

```bash
npm run format
```

## Testing with Web Test Runner

The co-located `.spec.ts` and `.test.ts` files are starter examples, not a
complete regression suite. The unit example checks fixture setup after
`run()`; the visual example has its screenshot assertion commented out.
Replace these placeholders with assertions for your plugin's behavior.

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

`npm run test:visual` runs the visual group; `npm run test:update` updates
visual baselines once you add screenshot assertions. The shared runner
currently uses Chromium. If its browser binary is missing, run
`npx oscd install-playwright`.

## Shared tooling

Build, lint, test, bundle, serve and deploy commands use
[`@omicronenergy/oscd-tooling`](https://www.npmjs.com/package/@omicronenergy/oscd-tooling).
`tsconfig.json` extends its shared base while keeping source/output paths local;
`eslint.config.js` is a thin wrapper for editor integration. Other tool configs
come from the shared package rather than duplicated local files.

`npm run build` emits JavaScript and declarations into `dist/`.
`npm run bundle` produces the standalone plugin bundle and `dist/demo/`.
Custom Elements Manifest generation is not configured.

The shared ESLint stylistic rules replace the previous Prettier setup.
`npm run format` is opt-in; it can change formatting.

## Local demo

```bash
npm run start
```

This starts the development/watch server for `demo/index.html`.
Use `npm run start:bundle` to serve the bundled output instead.
The demo loads Google Fonts and a remote Source Editor; those features require
network access.

&copy; 2025 OMICRON electronics GmbH

## License

[Apache-2.0](LICENSE)
