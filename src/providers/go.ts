import * as vscode from 'vscode';
import * as common from './common';


export class JSONHoverProvider implements common.LangHoverJSONProvider {
    unescapeString = common.unescapeString;

    provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {
        const line = document.lineAt(position.line);
        const nodes = findStringLiteralNodes(line, position);

        if (nodes.length === 0) {
            return;
        }

        const node = nodes.find(node => node.start <= position.character && position.character <= node.end);
        if (!node) {
            return;
        }

        const text = node.text;
        const json = text.substring(1, text.length - 1);

        const unesapedJSON = common.unescapeString(json);

        try {
            const obj = JSON.parse(unesapedJSON);
            const markdown = new vscode.MarkdownString();
            const cmdURI = vscode.Uri.parse(
                `command:json-hover.copyRange?${encodeURIComponent(JSON.stringify({"val": unesapedJSON}))}`
            );
            markdown.appendMarkdown(`[Copy](${cmdURI})`);
            markdown.appendCodeblock(JSON.stringify(obj, null, 2), 'json');
            
            const literalRange = new vscode.Range(position.line, node.start, position.line, node.end);

            // mark as true to enable command URIs
            markdown.isTrusted = true;
            
            return new vscode.Hover(markdown, literalRange);
        } catch (e) {
            return;
        }
    }
}

export function findStringLiteralNodes(line: vscode.TextLine, position: vscode.Position): common.StringLiteralNode[] {
    let res: common.StringLiteralNode[] = [];
    const text = line.text;
    const pos = line.firstNonWhitespaceCharacterIndex;

    for (let i = 0; i < text.length; i++) {
        // Check for backtick strings
        if (text[i] === '`') {
            let start = i;
            let isEscaped = false;
            i++;
            
            while (i < text.length) {
                if (text[i] === '\\') {
                    isEscaped = !isEscaped;
                } else if (text[i] === '`' && !isEscaped) {
                    let end = i;
                    res.push({
                        text: text.substring(start, end + 1),
                        start: pos + start,
                        end: pos + end
                    });
                    break;
                } else {
                    isEscaped = false;
                }
                i++;
            }
        }
        // Check for double-quoted strings
        else if (text[i] === '"') {
            let start = i;
            let isEscaped = false;
            i++;
            
            while (i < text.length) {
                if (text[i] === '\\') {
                    isEscaped = !isEscaped;
                } else if (text[i] === '"' && !isEscaped) {
                    let end = i;
                    res.push({
                        text: text.substring(start, end + 1),
                        start: pos + start,
                        end: pos + end
                    });
                    break;
                } else {
                    isEscaped = false;
                }
                i++;
            }
        }
    }

    return res;
}
