import * as vscode from 'vscode';
import { URI as Uri } from 'vscode-uri';
import { Log } from 'vscode-test-adapter-util';
import { Ply, Suite, Request, Case} from 'ply-ct';
import { PlyConfig } from './config';

export class PlyLoader {

    constructor(private readonly workspaceFolder: vscode.WorkspaceFolder,
            private readonly config: PlyConfig, private readonly log: Log) {
    }

    /**
     * Loads ply requests.
     * @returns a Map of location to Array of Requests
     */
    async loadRequests(): Promise<Map<Uri,Suite<Request>>> {
        const testsLocation = this.config.plyOptions.testsLocation;
        const requestFileUris = await vscode.workspace.findFiles(
            new vscode.RelativePattern(testsLocation, this.config.plyOptions.requestFiles),
            new vscode.RelativePattern(testsLocation, this.config.plyOptions.excludes));
        const requests = new Map<Uri,Suite<Request>>();
        const requestSuites = await new Ply(this.config.plyOptions).loadRequests(requestFileUris.map(fileUri => fileUri.fsPath));
        requestSuites.forEach(requestSuite => {
            requests.set(Uri.file(this.config.plyOptions.testsLocation + '/' + requestSuite.path), requestSuite);
        });
        return requests;
    }

    /**
     * Loads ply cases.
     */
    async loadCases(): Promise<Map<Uri,Suite<Case>>> {
        const testsLocation = this.config.plyOptions.testsLocation;
        const caseFileUris = await vscode.workspace.findFiles(
            new vscode.RelativePattern(testsLocation, this.config.plyOptions.requestFiles),
            new vscode.RelativePattern(testsLocation, this.config.plyOptions.excludes));
        const cases = new Map<Uri,Suite<Case>>();
        if (caseFileUris.length > 0) {
            const caseSuites = await new Ply(this.config.plyOptions).loadCases(caseFileUris.map(fileUri => fileUri.fsPath));
            caseSuites.forEach(caseSuite => {
                cases.set(Uri.file(this.config.plyOptions.testsLocation + '/' + caseSuite.path), caseSuite);
            });
        }
        return cases;
    }
}