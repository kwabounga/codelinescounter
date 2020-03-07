exports.configuration = function(file) {
  let fs = require('fs');

  let elmt = JSON.parse(fs.readFileSync(file, 'utf8'));
  return elmt;

}
