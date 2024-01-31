import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "treeview" is now active!');

	context.subscriptions.push(vscode.commands.registerCommand('treeview.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from treeview!');
	}));
}

export function deactivate() {}
