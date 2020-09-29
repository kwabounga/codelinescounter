#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var cnter = require('../exports/counter');

// get configuration in app directory
var conf = require('../exports/configuration').configuration('./conf/.conf');

// get options
program
  .version('1.0.0')
  .option('-f, --files', 'if you want show  the files in console')
  .option('-l, --logs', 'count lines of logs')
  .option('-b, --brackets', 'count lines of brackets, parentheses, comma, ect.')
  .option('-d, --doc', 'count lines of documentation and comments')
  .option('-e, --exclude [string]', 'exclude files on the fly separate with ";"')
  .option('-c, --conf [path]', 'override global configuration file')
  .option('-p, --path [path]', 'select another path')
  .option('-h, --help', 'help')
  .parse(process.argv);


// program
if (!program.help) {
  // displaying help
  console.log('\n[CODE LINE COUNTER HELP]\n')
  console.log('$ clcnter -[options:-f -l -b -d -h | -lbd]\n')
  console.log('------------------------\n')
  // console.log(program.options)
  console.log('options:')
  program.options.forEach((elmt => {
    console.log(elmt.flags, ':  ', elmt.description)
  }))
  console.log('\n------------------------\n')
  console.log('configuration:')
  console.log('%application-directory/conf/.conf:');
  console.log(conf);
  console.log('\n------------------------\n')
  return;
} else {
  if (program.conf) {
    if (program.conf != true) {
      console.log('try to load override_conf file:', process.cwd() + '/' + program.conf)
      let override_conf;
      try {
        override_conf = require('../exports/configuration').configuration(process.cwd() + '/' + program.conf);
        console.log(override_conf)
      } catch (err) {
        override_conf = null
        console.log('file doesn\'t exist');
      }
      conf = ((override_conf !== null) ? override_conf : conf);

    } else {
      console.log('override conf option looking for path arg')
      return;
    }
  }
  // count
  cnter.count(conf, program.files, program.logs, program.brackets, program.doc, program.exclude, program.path);
}
