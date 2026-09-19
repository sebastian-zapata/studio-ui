# Studio UI

> [!WARNING]
> Work in progress repo, do NOT use yet!

A rather niche VS Code customization for C++ developers. I’ve used Visual
Studio for many years and currently use Visual Studio 2026, but I also have to
do a lot of development directly on Linux systems. VS Code seems like the best
option there, so I’ve created not only a theme, but also several UX
modifications that match the behavior of Visual Studio 2026. This reduces the
visual and behavioral readjustment required every time I switch IDEs, saving
me time and mental energy.

I’m not trying to create an exact clone. The goal is simply to make it feel
subconsciously familiar, reducing the cognitive effort required to quickly
identify UI elements and adapt to behaviors that differ significantly from
Visual Studio.

![VS2026 for VS Code](media/screenshot.png)

## Features

* Visual Studio 2026-inspired editor and workbench colors
* Dotted indentation guides
* Customized tab appearance and behavior
* Customized scrolling and scrollbar behavior
* Matching UI spacing, borders, and visual details
* [Sebastian Zapata Console](fonts/SebastianZapataConsole), a Cascadia Code
  derivative tuned to closely match Visual Studio 2026 on Linux systems
* FreeType tuning for Visual Studio-like text rendering on Linux
* C++ syntax-color customizations
* Wrapped editor tabs by default
* Disabled minimap by default
* 80-column editor ruler by default

The customization consists of VS Code settings, a custom coding font, and
custom CSS and JavaScript loaded through
[Custom CSS and JS Loader](https://marketplace.visualstudio.com/items?itemName=be5invis.vscode-custom-css).

## Installation

Install **Studio UI** from the Visual Studio Marketplace.

The required [Custom CSS and JS Loader][custom-css-loader] is installed
automatically as an extension dependency. Studio UI then:

1. Registers its bundled `custom.css`.
2. Provides VS Code defaults for its colors, fonts, layout, and editor behavior.
3. Invokes the loader to inject the CSS and JavaScript into the workbench.

When prompted, click **Restart Visual Studio Code**. This restart is required
before the CSS can appear because the current workbench has already loaded.

No manual CSS copying or `settings.json` editing is required.

The loader must be able to modify the VS Code installation. On Windows,
applying the customization may require starting VS Code as an administrator.
If VS Code reports that its installation is corrupt afterward, select
**Don’t Show Again**. This warning is caused by the loader modifying the
workbench files.

Any setting in `settings.json` (user settings) will take precedence over
this extension’s defaults.

## Compatibility

VS2026 for VS Code requires VS Code 1.135.0 or later. It was developed and
tested primarily on Zorin OS Linux. Its custom CSS and JavaScript depend on
internal VS Code workbench structure and may require updates when that
structure changes.

## Removal

Before uninstalling VS2026 for VS Code, run **Disable Custom CSS and JS** from
the Command Palette and restart VS Code.

## Disclaimer

This is an independent project and is not affiliated with, sponsored by, or
endorsed by Microsoft.

Visual Studio, Visual Studio Code, and Microsoft are trademarks of Microsoft
Corporation.

## License

The source code and configuration files are licensed under the
[MIT License](LICENSE).

[Sebastian Zapata Console](fonts/SebastianZapataConsole) is licensed separately
under the
[SIL Open Font License, Version 1.1](fonts/SebastianZapataConsole/OFL.txt).

Copyright © 2026 Sebastian Zapata.

[custom-css-loader]: https://marketplace.visualstudio.com/items?itemName=be5invis.vscode-custom-css
