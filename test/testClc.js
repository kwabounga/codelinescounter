const assert = require('assert');
const testCounter = require('../exports/counter');
var conf;
console.log(conf);
describe('#Configuration module ', function() {
  // load conf from object
  conf = require('../exports/configuration').configurationFromObj(
    `{
      "include_files": [".js", ".css", ".html",".txt", ".md", ".svg",".java"],
      "exclude_files": ["Kwa","jquery","bootstrap","babylon",".git","package",".exe",".zip",".jpg",".png",".gif",".bmp",".conf"],
      "exclude_folders": ["node_modules", ".git",".atom",".project","conf",".nyc_output","test"],
      "include_folders": []
    }`
  );
  let c = {
  include_files: ['.js', '.css', '.html', '.txt', '.md', '.svg', '.java'],
  exclude_files: ['Kwa',
    'jquery',
    'bootstrap',
    'babylon',
    '.git',
    'package',
    '.exe',
    '.zip',
    '.jpg',
    '.png',
    '.gif',
    '.bmp',
    '.conf'
  ],
  exclude_folders: ['node_modules', '.git', '.atom', '.project', 'conf','.nyc_output','test'],
  include_folders: []
};
  // console.log(c);
  it('loading and set configuration from object', () => {
    assert.deepStrictEqual(conf, c);
  });

 
  conf = require('../exports/configuration').configuration('./conf/.conf');
  it('loading and set configuration from file', () => {
    assert.deepStrictEqual(conf, c);
  });
});
describe('#counter', function() {
  describe('count()', function() {
    it('clcnter must find 3 lines of code here', () => {
      assert.strictEqual(testCounter.count(conf,null,true,null,null,null,'./test/someCode/'), 3);
    })
    
    it('clcnter must find 1 line of code here', () => {
      assert.strictEqual(testCounter.count(conf,null,null,null,null,null,'./test/someCode/'), 1);
    });

    it('clcnter is written in only 230 lines of code !', () => {
      assert.strictEqual(testCounter.count(conf,null,null,null,null,'.md;.json',null), 230);
    });
  });

});
