import * as fs from 'fs';
import * as vscode from 'vscode';
import { RunOptions } from 'ply-ct';
import { PlyAdapter } from './adapter';
import { Result } from './result/result';

export class AdapterHelper {

    constructor(
        readonly type: 'requests' | 'cases' | 'flows',
        readonly adapters: Map<string, PlyAdapter>
    ) {

    }

    getAdapter(uri: vscode.Uri): PlyAdapter {
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
        if (!workspaceFolder) {
            throw new Error(`Workspace folder not found for flow path: ${uri}`);
        }
        const adapter = this.adapters.get(workspaceFolder.uri.toString());
        if (!adapter) {
            throw new Error(`No test adapter found for workspace folder: ${workspaceFolder.uri}`);
        }
        return adapter;
    }

    async run(uri: vscode.Uri, target?: string, values: object = {}, runOptions?: RunOptions, debug = false) {
        try {
            const id = this.getId(uri, target);
            console.debug(`run: ${id}`);
            const adapter = this.getAdapter(uri);
            await adapter?.run([id], values, { ...runOptions, proceed: true });
        } catch (err) {
            console.error(err);
            vscode.window.showErrorMessage(err.message);
        }
    }

    expectedResult(uri: vscode.Uri, target?: string) {
        const id = this.getId(uri, target);
        console.debug(`expected: ${id}`);
        const adapter = this.getAdapter(uri);
        const suite = adapter?.plyRoots.getSuite(id);
        if (suite) {
            let fileUri = vscode.Uri.file(suite.runtime.results.expected.toString());
            if (target) {
                fileUri = fileUri.with({ fragment: target });
            }
            const expectedUri = Result.fromUri(fileUri).toUri().with({ query: 'type=flow' });
            vscode.commands.executeCommand('ply.openResult', expectedUri);
        } else {
            vscode.window.showErrorMessage(`Suite not found for: ${id}`);
        }
    }

    compareResults(uri: vscode.Uri, target?: string) {
        const id = this.getId(uri, target);
        console.debug(`compare: ${id}`);
        vscode.commands.executeCommand('ply.diff', id);
    }

    async removeActualResult(uri: vscode.Uri) {
        const id = this.getId(uri);
        const adapter = this.getAdapter(uri);
        const suite = adapter?.plyRoots.getSuite(id);
        if (suite) {
            const actual = suite.runtime.results.actual.toString();
            if (fs.existsSync(actual)) {
                fs.promises.unlink(actual);
            }
        }
    }

    getId(uri: vscode.Uri, target?: string): string {
        let id = uri.toString(true);
        if (target) {
            id += `#${target}`;
        } else {
            id = `${this.type}|${id}`;
        }
        return id;
    }
}