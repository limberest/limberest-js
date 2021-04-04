import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';
import { AdapterHelper } from '../adapterHelper';
import { Web } from './web';

export class RequestEditor implements vscode.CustomTextEditorProvider {

    private disposables: { dispose(): void }[] = [];

    constructor(
        private context: vscode.ExtensionContext,
        private adapterHelper: AdapterHelper
    ) {
    }

    async resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        _token: vscode.CancellationToken
    ): Promise<void> {

        webviewPanel.webview.options = {
            enableScripts: true
        };

        const mediaPath = path.join(this.context.extensionPath, 'media');
        const baseUri = webviewPanel.webview.asWebviewUri(vscode.Uri.file(mediaPath)).toString();

        const web = new Web(baseUri, path.join(mediaPath, 'flow.html'), webviewPanel.webview.cspSource);
        webviewPanel.webview.html = web.html;

        const updateWebview = async () => {
            const isFile = document.uri.scheme === 'file';
            const msg = {
                type: 'update',
                base: baseUri.toString(),
                file: isFile ? document.uri.fsPath : document.uri.toString(),
                text: document.getText(),
                readonly: !isFile || (fs.statSync(document.uri.fsPath).mode & 146) === 0
            } as any;
            webviewPanel.webview.postMessage(msg);
        };

        this.disposables.push(webviewPanel.webview.onDidReceiveMessage(async message => {
            if (message.type === 'change') {
                const isNew = !document.getText().trim();
                if (isNew) {
                    fs.writeFileSync(document.uri.fsPath, message.text);
                } else {
                    const edit = new vscode.WorkspaceEdit();
                    edit.replace(
                        document.uri,
                        new vscode.Range(0, 0, document.lineCount, 0),
                        message.text
                    );
                    await vscode.workspace.applyEdit(edit);
                }
                this.adapterHelper.removeActualResult(document.uri);
            }
        }));

        this.disposables.push(vscode.workspace.onDidChangeConfiguration(configChange => {
            if (configChange.affectsConfiguration('workbench.colorTheme')) {
                webviewPanel.webview.postMessage({
                    type: 'theme-change'
                });
            }
        }));

        if (document.uri.scheme === 'file') {

            const onValuesUpdate = async (resultUri?: vscode.Uri) => {
                const adapter = this.adapterHelper.getAdapter(document.uri);
                if (adapter?.values) {
                    const suite = adapter.plyRoots.getSuite(this.adapterHelper.getId(document.uri));
                    if (suite) {
                        const actualPath = suite.runtime.results.actual.toString();
                        if (!resultUri || actualPath === resultUri.fsPath.replace(/\\/g, '/')) {
                            webviewPanel.webview.postMessage({
                                type: 'values',
                                base: baseUri.toString(),
                                flowPath: document.uri.fsPath,
                                values: await adapter.values.getResultValues(this.adapterHelper.getId(document.uri)),
                                storeVals: this.context.workspaceState.get('ply-user-values')
                            });
                        }
                    }
                }
            };

            const adapter = this.adapterHelper.getAdapter(document.uri);
            if (adapter.values) {
                this.disposables.push(adapter.values.onValuesUpdate(updateEvent => onValuesUpdate(updateEvent.resultUri)));
                // initial values
                await webviewPanel.webview.postMessage({
                    type: 'values',
                    base: baseUri.toString(),
                    flowPath: document.uri.fsPath,
                    values: await adapter.values.getResultValues(this.adapterHelper.getId(document.uri)),
                    storeVals: this.context.workspaceState.get('ply-user-values')
                });
            } else {
                adapter.onceValues(async e => {
                    webviewPanel.webview.postMessage({
                        type: 'values',
                        base: baseUri.toString(),
                        flowPath: document.uri.fsPath,
                        values: await e.values.getResultValues(this.adapterHelper.getId(document.uri)),
                        storeVals: this.context.workspaceState.get('ply-user-values')
                    });
                    this.disposables.push(e.values.onValuesUpdate(updateEvent => onValuesUpdate(updateEvent.resultUri)));
                });
            }

        }

        webviewPanel.onDidDispose(() => {
            for (const disposable of this.disposables) {
                disposable.dispose();
            }
            this.disposables = [];
        });

        updateWebview();
    }
}