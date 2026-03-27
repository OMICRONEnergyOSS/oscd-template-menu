import { expect, fixture, html } from '@open-wc/testing';
import OscdTemplateMenu from './oscd-template-menu.js';

customElements.define('oscd-template-menu', OscdTemplateMenu);

const sclXmlDocString = `<?xml version="1.0" encoding="UTF-8"?><SCL version="2007" revision="B" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:ens1="http://example.org/somePreexistingExtensionNamespace">
  <Substation ens1:foo="a" name="A1" desc="test substation"></Substation>
</SCL>`;

describe('oscd-template-menu', () => {
  let plugin: OscdTemplateMenu;

  beforeEach(async () => {
    const sclDoc = new DOMParser().parseFromString(
      sclXmlDocString,
      'application/xml',
    );
    plugin = await fixture(html`<oscd-template-menu></oscd-template-menu>`);
    plugin.docs = {
      'test.scd': sclDoc,
    };
    plugin.doc = sclDoc;
    plugin.docName = 'test.scd';
  });

  afterEach(() => {
    plugin.remove();
  });

  it('tests that the plugin works as expected', async () => {
    await plugin.run();
    // Add your assertions here
    expect(plugin.docName).to.equal('test.scd');
  });
});
