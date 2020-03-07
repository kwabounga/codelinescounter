#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var cnter = require('../exports/counter');

// found application directory
let pathCurDir = '';
let p;
if(__dirname.lastIndexOf('/') != -1 ){
  p = __dirname.lastIndexOf('/')
} else {
  p = __dirname.lastIndexOf('\\')
}

// get configuration in app directory
var conf = require('../exports/configuration').configuration(__dirname.slice(0,p)+'/conf/.conf');

// get options
program
  .version('1.0.0')
  .option('-f, --files', 'if you want show  the files in console')
  .option('-l, --logs', 'count lines of logs')
  .option('-b, --brackets', 'count lines of brackets, parentheses, comma, ect.')
  .option('-d, --doc', 'count lines of documentation and comments')
  .option('-h, --help', 'help')
  .parse(process.argv);


// program
if(!program.help){
  // displaying help
  console.log('\n[CODE LINE COUNTER HELP]\n')
  console.log('$ clc -[options:-f -l -b -d -h | -lbd]\n')
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
  // count
  cnter.count(conf, program.files, program.logs, program.brackets, program.doc);
}
