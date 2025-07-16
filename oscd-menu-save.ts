export default class SaveProjectPlugin extends HTMLElement {
  docs!: Record<string, XMLDocument>;
  doc!: XMLDocument;
  docName!: string;

  async run(): Promise<void> {
    if (this.doc) {
      let documentAsString = new XMLSerializer().serializeToString(this.doc);

      // Add XML declaration/prolog if it's been stripped
      // TODO: This can be removed once the improved OpenSCD core edit API is present
      documentAsString = documentAsString.startsWith('<?xml')
        ? documentAsString
        : '<?xml version="1.0" encoding="UTF-8"?>' + '\n' + documentAsString;

      const blob = new Blob([documentAsString], {
        type: 'application/xml',
      });

      const a = document.createElement('a');
      a.download = this.docName;
      a.href = URL.createObjectURL(blob);
      a.dataset.downloadurl = ['application/xml', a.download, a.href].join(':');
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
      }, 5000);
    }
  }
}
