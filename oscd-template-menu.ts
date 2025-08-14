import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { EditV2, Transactor } from '@omicronenergy/oscd-api';

export default class OscdTemplateMenu extends ScopedElementsMixin(LitElement) {
  static scopedElements = {
    /*
     * add any web-components this component will reference here.
     * E.g.
     * "oscd-button": OscdButton,
     *
     * Important!
     * Importing the web-component class should NOT result in the web-component being registered with the global customElements registry.
     * Otherwise it will fail to render at all. You'll only get an empty tag, no web component.
     */
  };

  @property({ type: Object })
  editor!: Transactor<EditV2>;

  @property({ type: Object })
  docs!: Record<string, XMLDocument>;

  @property({ type: Object })
  doc?: XMLDocument;

  @property({ type: String })
  docName?: string;

  @property({ attribute: false })
  docVersion?: unknown;

  @property({ type: String })
  locale?: string;

  async run() {
    // Implement the logic for the run method
    if (this.docName) {
      console.log(`Running with document: ${this.docName}`);
    }
  }

  render() {
    /* Anything rendered in here for a Menu plugin, will be hidden
     * Typically you would render dialogs here, where the run method
     * may set the dialogs state to open.
     */
    return html`
      <h1>OSCD Template Menu</h1>
      <p>
        Welcome to the OSCD Template Menu. Currently selected Document is:
        ${this.docName}.
      </p>
    `;
  }

  static styles = css`
    :host {
      /* Ideal place to set CSS to the root of the component */
      background-color: var(--oscd-something);
    }

    * {
      /* Ideal place to set CSS variables, which should be applied to all elements.
       * typically done to set Material Component theme variables.
      */
      --md-something: var(--oscd-something);
    }
  `;
}
