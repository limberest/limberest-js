import * as fs from 'fs';

export class Web {

    private static htmls = new Map<string, string>();

    webSocketPort?: number

    constructor(
        readonly baseUri: string,
        readonly template: string,
        readonly cspSource: string,
    ) {
    }

    get html(): string {
        let html = Web.htmls.get(this.template);

        // cache this
        if (!html) {
            html = fs.readFileSync(this.template, 'utf-8');

            // webBase
            html = html.replace(/\${webBase}/g, this.baseUri);
            Web.htmls.set(this.template, html);
        }

        // substitute the nonce and websocket port every time
        if (this.webSocketPort) {
            html = html.replace(/\${wsSource}/g, `ws://localhost:${this.webSocketPort}`);
        }
        html = html.replace(/\${cspSource}/g, this.cspSource);
        html = html.replace(/\${nonce}/g, this.getNonce());

        return html;
    }

    getNonce(): string {
        let nonce = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            nonce += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return nonce;
    }
}