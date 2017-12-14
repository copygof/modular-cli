#!/usr/bin/env node

'use strict';

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
    console.log()
  })  

program.parse(process.argv)

// when args is emtry or not match
if (!program.args.length) printHeader(() => program.help())
