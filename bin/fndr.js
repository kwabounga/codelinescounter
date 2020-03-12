#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var finder = require('../exports/finder');

// found application directory
let pathCurDir = '';
let p;
if (__dirname.lastIndexOf('/') != -1) {
  p = __dirname.lastIndexOf('/')
} else {
  p = __dirname.lastIndexOf('\\')
}

// get configuration in app directory
var conf = require('../exports/configuration').configuration(__dirname.slice(0, p) + '/conf/fndr.conf');

// get options
program
  .version('1.0.0')
  .option('-f, --find [string]', 'the expression you want to find')
  .option('-c, --conf [path]', 'override global configuration file')
  .option('-h, --help', 'help')
  .parse(process.argv);


// program
if (!program.help) {
  // displaying help
  console.log('\n[FINDER HELP]\n');
  console.log('$ fndr -[options:-f -e -c -h]\n');
  console.log('------------------------\n');
  console.log('options:');
  program.options.forEach((elmt => {
    console.log(elmt.flags, ':  ', elmt.description);
  }))
  console.log('\n------------------------\n');
  console.log('configuration:');
  console.log('%application-directory/conf/.conf:');
  console.log(conf);
  console.log('\n------------------------\n');
  return;
} else {
  if(program.find){

    if(program.find != true){
      console.log('try to find '+ program.find)
    } else {
      console.log('you must define a expression to find it');
      return;
    }
  }
  if (program.conf) {
    if (program.conf != true) {
      console.log('try to load override_conf file:', process.cwd() + '/' + program.conf);
      let override_conf;
      try {
        override_conf = require('../exports/configuration').configuration(process.cwd() + '/' + program.conf);
        console.log(override_conf);
      } catch (err) {
        override_conf = null;
        console.log('file doesn\'t exist');
      }
      conf = ((override_conf !== null) ? override_conf : conf);
    } else {
      console.log('override conf option looking for path arg');
      return;
    }
  }
  // finder
  finder.find(program.find,conf);
}
