import * as vscode from "vscode";
import * as go from './providers/go';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('json-hover.copyRange', (args: any) => {
		const n = args.val.length;
		vscode.window.showInformationMessage(`Copied ${n} characters!`);

		vscode.env.clipboard.writeText(args.val);
	});
	
	context.subscriptions.push(disposable);
	vscode.languages.registerHoverProvider('go', new go.JSONHoverProvider());
}

export function deactivate() {}
