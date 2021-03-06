const fs = require('fs');
const p = require('path');
exports.count = function(conf, showFiles, countLogs, countBrackets, countDoc, excludedFilesOTF, projetPath) {


  let global_count = 0;
  let allefotf = [];
  if (excludedFilesOTF) {
    // console.log(excludedFilesOTF)
    if (excludedFilesOTF !== true) {
      allefotf = excludedFilesOTF.split(';')
      console.log('\n[Excluded files on the fly]:')
      console.log(allefotf)
    }
  }
  let counter = function(path, isFirst = false, level = 1, isLastParents = [false]) {

    if (path == process.cwd()) {
      path = './'
    }
    // console.log(p.resolve(path), path);
    let files = fs.readdirSync(p.resolve(path), {
      withFileTypes: true
    })
    // All Files
    files.forEach((file, f) => {
      if (file.isDirectory()) {
        // Folders
        let isInclude = false
        if (conf.include_folders.length > 0) {
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
        if (conf.exclude_folders.length > 0) {
          for (var i = 0; i < conf.exclude_folders.length; i++) {
            if (file.name.lastIndexOf(conf.exclude_folders[i]) !== -1) {
              // console.log(file.name,conf.exclude_files[i])
              isExclude = true;
            }
          }
        }
        let _indent = ((f === files.length - 1) ? indentlast : indent);
        if (isFirst) {
          if (isInclude) {
            if (!isExclude) {
              if (showFiles) {
                console.log(_indent(level, isLastParents) + '[ ' + path + file.name + '/ ]');
              }
              isLastParents.push(f == files.length - 1);
              counter(path + file.name + '/', false, (level + 1), isLastParents);
            }
          } else {
            if (!isExclude) {
              if (showFiles) {
                console.log(_indent(level, isLastParents) + '[ ' + path + file.name + '/ ]');
              }
              isLastParents.push(f == files.length - 1);
              counter(path + file.name + '/', false, (level + 1), isLastParents);
            }
          }
        } else {
          if (!isExclude) {
            if (showFiles) {
              console.log(_indent(level, isLastParents) + '[ ' + path + file.name + '/ ]');
            }
            isLastParents.push(f == files.length - 1);
            counter(path + file.name + '/', false, (level + 1), isLastParents);
          }

        }
      } else {
        // Files

        let isInclude = false
        if (conf.include_files.length > 0) {
          for (var i = 0; i < conf.include_files.length; i++) {
            if (file.name.lastIndexOf(conf.include_files[i]) !== -1) {
              // console.log(file.name,conf.exclude_files[i])
              isInclude = true;
            }
          }
        } else {
          isInclude = true;
        }

        //adding exclued files on the fly
        conf.exclude_files = conf.exclude_files.concat(allefotf);
        let isExclude = false
        if (conf.exclude_files.length > 0) {
          for (var i = 0; i < conf.exclude_files.length; i++) {
            if (file.name.lastIndexOf(conf.exclude_files[i]) !== -1) {
              // console.log(file.name,conf.exclude_files[i])
              isExclude = true;
            }
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
                if (countDoc && (begin === '//' || begin === '/*' || begin === '* ')) {
                  nbline++;
                } else if (begin !== '//' && begin !== '/*' && begin !== '* ') {
                  begin = lines[i].trim().slice(0, 8);
                  if (countLogs && begin == 'console.') {
                    // log lines
                    nbline++
                  } else if (begin !== 'console.') {
                    if (countBrackets && lines[i].trim().replace(/[\\\/\)\(\{\}\[\]\;\,\.]/gm, '') === '') {
                      // brackets lines
                      nbline++;
                    } else if (lines[i].trim().replace(/[\\\/\)\(\{\}\[\]\;\,\.]/gm, '') !== '') {
                      nbline++;
                    }
                  }
                }


              }
            }
            if (showFiles) {

              let _indent = ((f === files.length - 1) ? indentlast : indent)
              console.log(_indent(level, isLastParents) + file.name, '(' + nbline + ')');
            }
            // console.log('nbline of file', nbline)
            global_count += nbline
          }
        }

      }
    })

  }


  // indent Dirs
  let indentlast = function(level, lasts) {
    let idnt = '';
    for (var i = 0; i < level; i++) {
      idnt += ((i === level - 1) ? '└──' : ((i === 0 || !lasts[i]) ? '|  ' : '   '));
    }
    return idnt;
  }

  // indent Files
  let indent = function(level, lasts) {
    let c = '  ';
    let idnt = '';
    for (var i = 0; i < level; i++) {
      idnt += ((i === level - 1) ? '├──' : ((i === 0 || !lasts[i]) ? '|  ' : '   '));
      // idnt += c;
    }
    return idnt;
  }



  console.log('\nclcnter [code lines counter]\n')
  let opts = 'options:';
  opts += (showFiles) ? '[show files tree]' : '';
  opts += (countBrackets) ? '[count brackets]' : '';
  opts += (countDoc) ? '[count doc n comments]' : '';
  opts += (countLogs) ? '[count logs]' : '';
  opts += (excludedFilesOTF) ? '[exclude files otf]' : '';
  opts += '\n';
  console.log(opts);
  console.log('scan >> ' + process.cwd() + ':')
  if (showFiles) {
    console.log('[root]');
  }
  //console.log(process.cwd());
  //console.log(p.resolve(process.cwd()));
  let thePath = projetPath || process.cwd();
  counter(thePath, true);
  console.log('----------------');
  console.log(global_count, 'lines of code written!');
  console.log('----------------');
  if (!showFiles) {
    console.log('run clcnter -h  for more details');
  }
  return global_count;
}
