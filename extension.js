/*
 * Studio UI
 *
 * Copyright (c) 2026 Sebastian Zapata
 * SPDX-License-Identifier: MIT
 */
 
const vscode = require("vscode");

const LOADER_EXTENSION_ID = "be5invis.vscode-custom-css";
const LOADER_UPDATE_COMMAND = "extension.updateCustomCSS";
const IMPORTS_SECTION = "vscode_custom_css";
const IMPORTS_PROPERTY = "imports";
const CSS_FILE_NAME = "custom.css";
const APPLIED_STATE_KEY = "studioUi.appliedState";
const MANAGED_IMPORTS_KEY = "studioUi.managedImports";

function arraysEqual(left, right) {
	return left.length === right.length &&
		left.every((value, index) => value === right[index]);
}

function getCurrentImports(configuration) {
	const imports = configuration.get(IMPORTS_PROPERTY, []);

	if (!Array.isArray(imports)) {
		throw new Error(
			"vscode_custom_css.imports must be an array."
		);
	}

	return imports;
}

function getNextImports(currentImports, managedImports, bundledImport) {
	const nextImports = currentImports.filter(
		(value) => !managedImports.includes(value)
	);

	if (!nextImports.includes(bundledImport)) {
		nextImports.push(bundledImport);
	}

	return nextImports;
}

function getErrorMessage(error) {
	if (error instanceof Error) {
		return error.message;
	}

	return String(error);
}

async function activate(context) {
	try {
		const loaderExtension = vscode.extensions.getExtension(
			LOADER_EXTENSION_ID
		);

		if (!loaderExtension) {
			throw new Error(
				"Custom CSS and JS Loader is not installed."
			);
		}

		const configuration = vscode.workspace.getConfiguration(
			IMPORTS_SECTION
		);
		const currentImports = getCurrentImports(configuration);
		const managedImports = context.globalState.get(
			MANAGED_IMPORTS_KEY,
			[]
		);
		const bundledImport = vscode.Uri.joinPath(
			context.extensionUri,
			CSS_FILE_NAME
		).toString();
		const nextImports = getNextImports(
			currentImports,
			managedImports,
			bundledImport
		);
		const importsChanged = !arraysEqual(
			currentImports,
			nextImports
		);

		if (importsChanged) {
			await configuration.update(
				IMPORTS_PROPERTY,
				nextImports,
				vscode.ConfigurationTarget.Global
			);
		}

		await context.globalState.update(
			MANAGED_IMPORTS_KEY,
			[bundledImport]
		);

		const extensionVersion = context.extension.packageJSON.version;
		const loaderVersion = loaderExtension.packageJSON.version;
		const appliedState = [
			extensionVersion,
			vscode.version,
			loaderVersion
		].join(":");
		const previousState = context.globalState.get(
			APPLIED_STATE_KEY
		);

		if (!importsChanged && previousState === appliedState) {
			return;
		}

		await context.globalState.update(
			APPLIED_STATE_KEY,
			appliedState
		);

		try {
			await loaderExtension.activate();
			await vscode.commands.executeCommand(
				LOADER_UPDATE_COMMAND
			);
		} catch (error) {
			await context.globalState.update(
				APPLIED_STATE_KEY,
				undefined
			);
			throw error;
		}
	} catch (error) {
		void vscode.window.showErrorMessage(
			"Studio UI could not apply its CSS: " +
				getErrorMessage(error)
		);
	}
}

module.exports = {
	activate
};
