const fs = require('fs');

exports.find = function(expression, conf) {

  let included = conf.include_files;
  let excluded = conf.exclude_files;

  let rg = RegExp(expression, 'gm');
  // let path = 'C:\\\\Users\\utilisateur1\\projects\\';
  let finder = function(path) {

    if (path == process.cwd()) {
      path = './'
    }
    let files = fs.readdirSync(path, {
      withFileTypes: true
    })
    // All Files
    files.forEach((file, f) => {


      if (file.isDirectory()) {
        // Folders
        let isInclude = true;
        if (file.name.charAt(0) === '.') {
          isInclude = false;
        }
        if (isInclude) {
          finder(path + file.name + '/');
        }

      } else {
        // Files
        let isInclude = false
        if (included.length > 0) {
          for (let i = 0; i < included.length; i++) {
            if (file.name.lastIndexOf(included[i]) !== -1) {
              isInclude = true;
            }
          }
        } else {
          isInclude = true;
        }
        let isExclude = false;
        if (excluded.length > 0) {
          for (let i = 0; i < excluded.length; i++) {
            if (file.name.lastIndexOf(excluded[i]) !== -1) {
              isExclude = true;
            }
          }
        }


        if (isInclude) {
          if (!isExclude) {
            let content = fs.readFileSync(path + file.name, 'utf8');
            if (rg.test(content)) {
              let out = path + file.name;
              console.log(expression, 'found in ', out.slice(((out.length-80 > 0)?(out.length-80):0), out.length), 'at :');
              let lines = content.split(/\n/);

              lines.forEach((line, l) => {
                //if ! empty lines
                if (line.trim().length != 0) {
                  let containsExpression = (line.indexOf(expression) !== -1);
                  if (containsExpression) {
                    console.log('line:', l);
                  }
                }
              }); // fin foreach lines
            }

          } // excluded
        }
      } // fin else fichier
    });  // fin forEach files
  }


  console.log('\n[command find]\n')
  finder(process.cwd());
}
// console.time('founder');
// // find('hercule', ['.js', '.log', '.settings', '.xml', '.conf'], ['.json']);
// console.timeEnd('founder');
// console.log('fin');
