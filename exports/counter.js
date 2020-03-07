const fs = require('fs');

exports.count = function(conf, showFiles, countLogs, countBrackets, countDoc) {


  let global_count = 0;


  let counter = function(path, isFirst = false, level = 1) {

    if (path == process.cwd()) {
      path = './'
    }
    let files = fs.readdirSync(path, {
      withFileTypes: true
    })
    // All Files
    files.forEach((file, i) => {
      if (file.isDirectory()) {
        // Folders
        let isInclude = false
        if(conf.include_folders.length>0){
          for (var i = 0; i < conf.include_folders.length; i++) {
            if (file.name.lastIndexOf(conf.include_folders[i]) !== -1) {
              // console.log(file.name,conf.exclude_files[i])
              isInclude = true;
            }
          }
        } else {
          isInclude = true;
        }
        let isExclude = false
        if(conf.exclude_folders.length>0){
          for (var i = 0; i < conf.exclude_folders.length; i++) {
            if (file.name.lastIndexOf(conf.exclude_folders[i]) === -1) {
              // console.log(file.name,conf.exclude_files[i])
              isExclude = true;
            }
          }
        }

        if (isFirst) {
          if (isInclude) {
            if (showFiles) {
              console.log(indentdir(level) + '[ ' + path + file.name + '/ ]');
            }
            counter(path + file.name + '/', false, (level + 1));
          } else {
            if (!isExclude) {
              if (showFiles) {
                console.log(indentdir(level) + '[ ' + path + file.name + '/ ]');
              }
              counter(path + file.name + '/', false, (level + 1));
            }
          }
        } else {
          if (!isExclude) {
            if (showFiles) {
              console.log(indentdir(level) + '[ ' + path + file.name + '/ ]');
            }
            counter(path + file.name + '/', false, (level + 1));
          }

        }
      } else {
        // Files
        // let includedType = conf.include_files;
        // let excludedType = ['.json'];

        // conf.include_files.forEach((elmt) => {
        //   if (file.name.lastIndexOf(elmt) !== -1) {
        // conf.exclude_files.forEach((elmt) => {
        //   if (file.name.lastIndexOf(elmt) === -1) {
        let isInclude = false
        for (var i = 0; i < conf.include_files.length; i++) {
          if (file.name.lastIndexOf(conf.include_files[i]) === -1) {
            // console.log(file.name,conf.exclude_files[i])
            isInclude = true;
          }
        }
        let isExclude = false
        for (var i = 0; i < conf.exclude_files.length; i++) {
          if (file.name.lastIndexOf(conf.exclude_files[i]) !== -1) {
            // console.log(file.name,conf.exclude_files[i])
            isExclude = true;
          }
        }
        if (isInclude) {
          if (!isExclude) {
            let content = fs.readFileSync(path + file.name, 'utf8');
            let nbline = 0;
            let lines = content.split(/\n/);
            for (var i = 0; i < lines.length; i++) {
              // empty lines
              if (lines[i].trim().length != 0) {
                // comment lines
                let begin = lines[i].trim().slice(0, 2);
                if (countDoc && begin == '//' || begin == '/*' || begin == '* ') {
                  nbline++;
                } else if (begin != '//' && begin != '/*' && begin != '* ') {
                  begin = lines[i].trim().slice(0, 8);
                  if (countLogs && begin == 'console.') {
                    // log lines
                    nbline++
                  } else if (begin != 'console.') {
                    if (countBrackets && lines[i].trim().replace(/[\\\/\)\(\{\}\[\]\;\,\.]/gm, '') == '') {
                      // brackets lines
                      nbline++;
                    } else if (lines[i].trim().replace(/[\\\/\)\(\{\}\[\]\;\,\.]/gm, '') != '') {
                      nbline++;
                    }
                  }
                }


              }
            }
            if (showFiles) {
              console.log(indent(level) + file.name, '(' + nbline + ')');
            }
            // console.log('nbline of file', nbline)
            global_count += nbline
          }
        }

      }
    })
    //   }
    // })
    //   }
    // });

  }


  // indent Dirs
  let indentdir = function(level) {
    let idnt = '';
    for (var i = 0; i < level; i++) {
      idnt += ((i == level - 1) ? '├──' : '|  ');
    }
    return idnt;
  }

  // indent Files
  let indent = function(level) {
    let c = '  ';
    let idnt = '';
    for (var i = 0; i < level; i++) {
      idnt += ((i == level - 1) ? '├──' : '|  ');
      // idnt += c;
    }
    return idnt;
  }



  console.log('\n[code lines counter]\n')
  console.log('scan >> ' + process.cwd() + ':')
  if (showFiles) {
    console.log('[root]');
  }
  counter(process.cwd(), true);
  console.log('----------------')
  console.log(global_count, 'lines of code written!')
  console.log('----------------')
  if (!showFiles) {
    console.log('run clc -h  for more details');
  }
}
