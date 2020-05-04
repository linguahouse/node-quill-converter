const { iterate } = require('leakage');
const {
  convertTextToDelta,
  convertHtmlToDelta,
  convertDeltaToHtml } = require('../lib/index.js');


describe('node-quill-converter', () => {
  it('convertTextToDelta - does not leak', () => {
    iterate(() => {
      const text = 'hello, world';

      convertTextToDelta(text);
    }, {
      iterations: 10,
      gcollections: 20
    })
  })

  it('convertHtmlToDelta - does not leak', () => {
    iterate(() => {
      const html = `<p>hello, <strong>world</strong></p>`;

      convertHtmlToDelta(html);
    }, {
      iterations: 10,
      gcollections: 20
    })
  })

  it('convertDeltaToHtml - does not leak', () => {
    iterate(() => {
      const delta = {
        ops: [
          {
            insert: "hello, "
          },
          {
            insert: "world",
            attributes: {
              bold: true
            }
          }
        ]
      };

      convertDeltaToHtml(delta);
    }, {
      iterations: 10,
      gcollections: 20
    })
  })
})