export class Options {

    indent = 2; // TODO

    get theme(): 'light' | 'dark' {
        return document.body.className.endsWith('vscode-dark') ? 'dark' : 'light';
    }

    get iconBase(): string {
      return `${this.base}/img/icons/${this.theme}`;
    }

    constructor(readonly base: string) {
    }
}
