// @ts-ignore
const vscode = acquireVsCodeApi();

export interface RequestState {
    base: string;
    file: string;
    text: string;
    readonly: boolean;
}

export function updateState(delta: RequestState) {
    vscode.setState({ ...vscode.getState(), ...delta });
}

export function readState(): RequestState | undefined {
    const state = vscode.getState();
    if (state && state.base && state.file) {
        // templates = new Templates(state.base);
        return state;
    }
}

