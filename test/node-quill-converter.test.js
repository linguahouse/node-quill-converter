const {
  convertTextToDelta,
  convertHtmlToDelta,
  convertDeltaToHtml } = require('../lib/index.js');

describe('node-quill-converter', () => {
  it('convertTextToDelta', () => {
    let text = 'hello, world';
    let deltaExpected = {ops: [{insert: 'hello, world'}]};

    let deltaResult = convertTextToDelta(text);

    expect(deltaResult).toEqual(deltaExpected);
  });

  it('convertHtmlToDelta', () => {
    let html = `<p>hello, <strong>world</strong></p>`;
    let deltaExpected = {
      ops:[
        {
          insert: "hello, "
        },
        {
          insert:"world",
          attributes: {
            bold: true
          }
        }
      ]
    };
    
    let deltaResult = convertHtmlToDelta(html);

    expect(deltaResult).toEqual(deltaExpected);
  });

  it('convertHtmlToDelta', () => {
    let delta = {
      ops:[
        {
          insert: "hello, "
        },
        {
          insert:"world",
          attributes: {
            bold: true
          }
        }
      ]
    };

    let htmlExpected = `<p>hello, <strong>world</strong></p>`;
    let htmlResult = convertDeltaToHtml(delta);

    expect(htmlResult).toEqual(htmlExpected);
  });

  it('GitHub Issue #2', () => {
    let delta = {
     "ops": [
      {
       "insert": "first"
      },
      {
       "attributes": {
        "list": "ordered"
       },
       "insert": "\n"
      },
      {
       "insert": "second"
      },
      {
       "attributes": {
        "list": "ordered"
       },
       "insert": "\n"
      },
      {
       "insert": "next level"
      },
      {
       "attributes": {
        "indent": 1,
        "list": "ordered"
       },
       "insert": "\n"
      }
     ]
    };

    let htmlExpected = "<ol><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>first</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>second</li><li data-list=\"ordered\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>next level</li></ol>";
    let htmlResult = convertDeltaToHtml(delta);

    expect(htmlResult).toEqual(htmlExpected);
  });
});
