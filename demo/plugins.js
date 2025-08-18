import OscdMenuOpen from '@omicronenergy/oscd-menu-open';
import OscdBackgroundEditV1 from '@omicronenergy/oscd-background-editv1';

import OscdMenuSave from '../oscd-template-menu.js';

customElements.define('oscd-menu-open', OscdMenuOpen);
customElements.define('oscd-background-editv1', OscdBackgroundEditV1);

customElements.define('oscd-template-menu', OscdMenuSave);

export const plugins = {
  menu: [
    {
      name: 'Open File',
      translations: { de: 'Datei öffnen' },
      icon: 'folder_open',
      tagName: 'oscd-menu-open',
    },
    {
      name: 'Save File',
      translations: { de: 'Datei speichern' },
      icon: 'save',
      requireDoc: true,
      tagName: 'oscd-template-menu',
    },
  ],
  editor: [],
  background: [
    {
      name: 'EditV1 Events Listener',
      icon: 'none',
      requireDoc: true,
      tagName: 'oscd-background-editv1',
    },
  ],
};
