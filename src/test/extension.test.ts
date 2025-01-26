import * as assert from 'assert';
import * as vscode from 'vscode';
import { unescapeString } from '../providers/common';
import { findStringLiteralNodes } from '../providers/go';

function createTextLine(text: string, firstNonWhitespaceIndex = 0): vscode.TextLine {
    return {
        text,
        lineNumber: 0,
        range: new vscode.Range(0, 0, 0, text.length),
        rangeIncludingLineBreak: new vscode.Range(0, 0, 0, text.length),
        firstNonWhitespaceCharacterIndex: firstNonWhitespaceIndex,
        isEmptyOrWhitespace: text.trim().length === 0
    };
}

suite('String Literal Parsing Test Suite', () => {
    test('Find simple double-quoted string', () => {
        const line = createTextLine('"hello world"');
        const result = findStringLiteralNodes(line, new vscode.Position(0, 0));

        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].text, '"hello world"');
        assert.strictEqual(result[0].start, 0);
        assert.strictEqual(result[0].end, 12);
    });

    test('Find simple backtick string', () => {
        const line = createTextLine('`hello world`');
        const result = findStringLiteralNodes(line, new vscode.Position(0, 0));
        
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].text, '`hello world`');
        assert.strictEqual(result[0].start, 0);
        assert.strictEqual(result[0].end, 12);
    });

    test('Find multiple strings in a line', () => {
        const line = createTextLine('"first" `second`');
        const result = findStringLiteralNodes(line, new vscode.Position(0, 0));
        
        assert.strictEqual(result.length, 2);
        assert.strictEqual(result[0].text, '"first"');
        assert.strictEqual(result[1].text, '`second`');
    });

    test('Handle strings with escaped quotes', () => {
        const line = createTextLine('"hello \\" world"');
        const result = findStringLiteralNodes(line, new vscode.Position(0, 0));
        
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].text, '"hello \\" world"');
    });

    test('Unescape double quotes', () => {
        assert.strictEqual(unescapeString('\\"hello\\"'), '"hello"');
    });

    test('Unescape backticks', () => {
        assert.strictEqual(unescapeString('\\`hello\\`'), '`hello`');
    });

    test('Handle multiple escape sequences', () => {
        assert.strictEqual(unescapeString('hello \\" world'), 'hello " world');
    });
});