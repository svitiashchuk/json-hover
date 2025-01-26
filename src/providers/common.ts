import * as vscode from 'vscode';

export interface LangHoverJSONProvider {
    provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover>;
}

export interface StringLiteralNode {
    text: string;
    start: number;
    end: number;
}

export function unescapeString(str: string): string {
    return str.replace(/\\(["'`\\])/g, '$1');
}
