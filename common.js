const chalk = require('chalk')
const figlet = require('figlet')
const fs = require('fs')
const { convertCallBackToPromise } = require('./utils')


const currentPath = process.cwd()

/**
 * Print Banner Head line
 * ----------------------
 */

const printHeader = (cb = () => {}) => {
  figlet.text('Modular kit cli', (err, data) => {
    if (err) {
        console.log('Something went wrong...')
        console.dir(err)
        return
    }
    console.log('\x1Bc')
    console.log(chalk.hex('#ff5000')(data))
    console.log(chalk.hex('#0030ff')('----------------------------------------------------------------->'))
    cb()
  });
}


/**
 *  clone modular from git
 *  ----------------------
 *  input  : list of git url
 *  return : list of path folder modular
 *  ----------------------
 */
const gitClone = (modularListUrl) => {
  // TODO
  // git clone with node js
  return findModularFromCurrentPath(modularListUrl)
}

/**
 *  find folder of modular
 *  ----------------------
 *  input  : list of git url
 *  return : list of path folder modular
 *  ----------------------
 */
const findModularFromCurrentPath = (modularListUrl) => {
  // TODO
  // find path, error when not have path modular from modularListUrl
  // currentPath
  return []
}


module.exports = {
  printHeader,
  gitClone,
  findModularFromCurrentPath
}
