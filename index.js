#!/usr/bin/env node

'use strict'

/**
*
* Modular kit cli
* ----------------
* This is command line interface for modular-kit
* see more modular-kit in https://bitbucket.org/dotography-code/scale-modular-kit
*
*/

const program = require('commander')
const log = require('npmlog')
const chalk = require('chalk');
const inquirer = require("inquirer");
const figlet = require('figlet');
const { printHeader } = require('./common')
const checkVersion = require('./feature/checkVersion')
const updateVersion = require('./feature/updateVersion')
const updatePackage = require('./feature/updatePackage')
// var prompt = inquirer.createPromptModule();

/*----------- config ----------*/
program
  .version('0.0.1')
  .usage('<command> [options] ')
  // .option('-I, --link <modularName>', 'import modular into main project.')
  // .option('-F, --feature <featureName>', 'create new feature in modular.')
  // .option('-cnf, --config [options]', 'config native project : when you set up modular module and need to export set up to main project')

/*----------- detect command ----------*/
program
  .command('init')
  .description('create new modular-kit project.')
  .action(() => {
    log.info('comming soon....')
  })  
program
  .command('check-version')
  .alias('cv')
  .description('check different version dependencies of modular')
  .action(() => {
    checkVersion()
  })  
program
  .command('update-version')
  .alias('uv')
  .description('update version dependencies of modular')
  .action(() => {
    updateVersion()
  })  

program
  .command('update-package')
  .alias('up')
  .description('update version dependencies of modular')
  .action(() => {
    updatePackage()
  })  


program.parse(process.argv)

// when args is emtry or not match
if (!program.args.length) printHeader(() => program.help())
// if (!process.argv.slice(2).length) {
//   printHeader(() => program.help())
// }
