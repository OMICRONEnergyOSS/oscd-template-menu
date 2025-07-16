import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import OscdMenuSave from './oscd-menu-save.js';
import sinon from 'sinon';

customElements.define('oscd-menu-save', OscdMenuSave);

const sclString = `<SCL version="2007" revision="B" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:ens1="http://example.org/somePreexistingExtensionNamespace">
  <Substation ens1:foo="a" name="A1" desc="test substation"></Substation>
</SCL>`;

const sclXmlDocString = `<?xml version="1.0" encoding="UTF-8"?>${sclString}`;
const sclDoc = new DOMParser().parseFromString(
  sclXmlDocString,
  'application/xml',
);

describe('oscd-menu-save', () => {
  let clickSpy = spy();
  let plugin: OscdMenuSave;
  let anchorElement: HTMLAnchorElement | null = null;
  const originalCreateElement = document.createElement;

  beforeEach(async () => {
    document.createElement = function (tagName: string) {
      const element = originalCreateElement.call(document, tagName);
      if (tagName === 'a') {
        anchorElement = element as HTMLAnchorElement;
        element.click = clickSpy;
      }
      return element;
    };
    clickSpy = spy();
    plugin = await fixture(html`<oscd-menu-save></oscd-menu-save>`);
    plugin.docs = {
      'test.scd': sclDoc,
    };
    plugin.doc = sclDoc;
    plugin.docName = 'test.scd';
  });

  afterEach(() => {
    plugin.remove();

    anchorElement = null;
    document.createElement = originalCreateElement;
  });

  it('opens the file save as dialog', async () => {
    sinon.stub(window, 'setTimeout').callsFake(fn => {
      fn();
      return 0 as unknown as ReturnType<typeof setTimeout>;
    });

    await plugin.run();
    sinon.restore();
    expect(clickSpy.callCount).to.equal(1);
    if (anchorElement) {
      const a = anchorElement as HTMLAnchorElement;
      expect(a.download).to.equal('test.scd');
      expect(a.href).to.include('blob:');
      expect(a.dataset.downloadurl).to.include('application/xml');
    } else {
      throw new Error('Anchor element was not created');
    }
  });

  it('adds that useless bit of xml to the top of the doc if its missing, for reasons no one can explain', async () => {
    const doc = new DOMParser().parseFromString(sclString, 'application/xml');
    plugin.docs = {
      'test.scd': doc,
    };
    plugin.doc = doc;
    await plugin.run();

    expect(clickSpy.callCount).to.equal(1);
    if (anchorElement && anchorElement.dataset.downloadurl) {
      const a = anchorElement as HTMLAnchorElement;
      expect(a.download).to.equal('test.scd');
      expect(a.href).to.include('blob:');
      expect(a.dataset.downloadurl).to.include('application/xml');

      const response = await fetch(anchorElement.href);
      const blob = await response.blob();
      const text = await blob.text();
      expect(text.indexOf('<?xml version="1.0" encoding="UTF-8"?>')).to.equal(
        0,
      );
    } else {
      throw new Error('Anchor element was not created');
    }
  });
});
