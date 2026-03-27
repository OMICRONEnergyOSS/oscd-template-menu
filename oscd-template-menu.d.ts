import { LitElement } from 'lit';
declare const OscdTemplateMenu_base: typeof LitElement & import("@open-wc/scoped-elements/lit-element.js").ScopedElementsHostConstructor;
export default class OscdTemplateMenu extends OscdTemplateMenu_base {
    static scopedElements: {};
    docs: Record<string, XMLDocument>;
    doc?: XMLDocument;
    docName?: string;
    docVersion?: unknown;
    locale?: string;
    run(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};
