import { LitElement } from 'lit';
import { EditV2, Transactor } from '@omicronenergy/oscd-api';
declare const OscdTemplateMenu_base: typeof LitElement & import("@open-wc/scoped-elements/lit-element.js").ScopedElementsHostConstructor;
export default class OscdTemplateMenu extends OscdTemplateMenu_base {
    static scopedElements: {};
    editor: Transactor<EditV2>;
    docs: Record<string, XMLDocument>;
    doc?: XMLDocument;
    docName?: string;
    docVersion?: unknown;
    locale?: string;
    run(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};
