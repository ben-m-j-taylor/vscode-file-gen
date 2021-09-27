import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	
	console.log('Extension "vscode-file-gen" activated!');

	let disposable1 = vscode.commands.registerCommand('vscode-file-gen.generateFilesInDirectory', () => {
		vscode.window.showInformationMessage('vscode-file-gen: Generating files in directory!');
	});

	let disposable2 = vscode.commands.registerCommand('vscode-file-gen.generateNewDirectoryWithFiles', () => {
		vscode.window.showInformationMessage('vscode-file-gen: Generating new directory with files!');
	});

	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
}

export function deactivate() {}
