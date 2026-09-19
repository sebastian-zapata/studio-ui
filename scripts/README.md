<!--
Studio UI

Copyright (c) 2026 Sebastian Zapata
SPDX-License-Identifier: MIT
-->

# Scripts

## Package the extension

From the repository root, run:

```bash
./scripts/package-vsix.sh
```

The generated VSIX file is placed in the repository root.

## Optional local Node.js toolchain

This optional environment is for systems where Node.js and npm are stored under
`${HOME}/apps/nodejs-toolchain` instead of installed system-wide.

Run the following commands in the terminal session used to package Studio UI:

```bash
export PATH="${HOME}/apps/nodejs-toolchain/node/bin:${PATH}"
export NPM_CONFIG_CACHE="${HOME}/apps/nodejs-toolchain/npm-cache"
export NPM_CONFIG_PREFIX="${HOME}/apps/nodejs-toolchain/npm-prefix"
export NPM_CONFIG_USERCONFIG="${HOME}/apps/nodejs-toolchain/npmrc"
export NPM_CONFIG_UPDATE_NOTIFIER="false"

npm --version
npm config get cache
npm config get prefix
```
