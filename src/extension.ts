import * as vscode from 'vscode';

import { getConfig } from './services/config-service';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "vscode-file-gen" is now active!');

	let disposable = vscode.commands.registerCommand('vscode-file-gen.helloWorld', () => {

		const config = getConfig();

		vscode.window.showInformationMessage('Hello World from vscode-file-gen!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
