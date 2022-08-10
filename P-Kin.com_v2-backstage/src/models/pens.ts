export interface Pen {
    name: string;
    codepenTitle: string;
    codepenId: string;
    descr: string;
}

export interface PensState {
    pens: Pen[];
}
