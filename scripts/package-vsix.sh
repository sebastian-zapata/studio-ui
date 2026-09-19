#!/usr/bin/env bash
#
# Studio UI
#
# Copyright (c) 2026 Sebastian Zapata
# SPDX-License-Identifier: MIT

set -euo pipefail

cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."
npx --yes @vscode/vsce@latest package --no-dependencies
