exports.configuration = function(file) {
  let p;
  if (__dirname.lastIndexOf('/') != -1) {
    p = __dirname.lastIndexOf('/')
  } else {
    p = __dirname.lastIndexOf('\\')
  }

  let path = require('path');
  let fs = require('fs');
  let filePath = path.resolve(path.join(__dirname.slice(0, p) , file));
  let elmt = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return elmt;

}
exports.configurationFromObj = function(obj) {
  let elmt = JSON.parse(obj);
  return elmt;

}
