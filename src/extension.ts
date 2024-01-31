import * as vscode from 'vscode';
import { NodeDependenciesProvider } from './provider';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "treeview" is now active!');

	context.subscriptions.push(vscode.commands.registerCommand('treeview.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from treeview!');
	}));

	// 3 steps for adding a treeview
	// 1 - contribute the treeview in your `package.json`
	// you can contribute a view to the following locations: explorer, debug, scm, test
	// that's defined in the `contributes.views` object at `package.json`
	// 2 - create a `TreeDataProvider`
	// 3 - register the `TreeDataProvider`

	const rootPath =
		vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
			? vscode.workspace.workspaceFolders[0].uri.fsPath
			: undefined;

	const nodeDependenciesProvider = new NodeDependenciesProvider(rootPath);

	// https://code.visualstudio.com/api/extension-guides/tree-view#registering-the-treedataprovider
	// 2 methods to register a `TreeDataProvider`
	//
	// `vscode.window.registerTreeDataProvider`
	// vscode.window.registerTreeDataProvider( // returns vscode.Disposable
	// 	'nodeDependencies',
	// 	nodeDependenciesProvider
	// );
	//
	// `vscode.window.createTreeView`
	// (this will give access to the TreeView, use this if you need to perform other view operations)
	const treeview = vscode.window.createTreeView('nodeDependencies', { // returns vscode.TreeView
		treeDataProvider: nodeDependenciesProvider
	});
	//
	// console.log(treeview);

	// https://code.visualstudio.com/api/extension-guides/tree-view#updating-tree-view-content
  vscode.commands.registerCommand('nodeDependencies.refreshEntry', () =>
    nodeDependenciesProvider.refresh()
  );
}

export function deactivate() {}
