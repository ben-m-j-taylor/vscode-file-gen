import * as vscode from 'vscode';

import generate from './generator';

export function activate(context: vscode.ExtensionContext) {
	let disposable1 = vscode.commands.registerCommand('vscode-file-gen.generateFilesInDirectory', (...args) => generate(args[0].fsPath, false));

	let disposable2 = vscode.commands.registerCommand('vscode-file-gen.generateNewDirectoryWithFiles', (...args) => generate(args[0].fsPath, true));

	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
}

export function deactivate() {}
