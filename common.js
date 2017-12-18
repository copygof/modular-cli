const chalk = require('chalk')
const figlet = require('figlet')
const fs = require('fs')
const cp = require('child_process');
const ora = require('ora')
const gitPackageJson = require('git-package-json')
const { convertCallBackToPromise } = require('./utils')
const checkVersion = require('./feature/checkVersion')

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
 * Loading Spinner
 * -----------------
 */

const Loading = () => {
  const spinner = ora()
  spinner.start();
  spinner.spinner = {
      "interval": 80,
      "frames": ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
  }
  return spinner
}


/**
 * get modular name from url
 * -------------------------
 */
const getModuleNameByUrl = (gitUrl) => gitUrl.slice(gitUrl.lastIndexOf('/') + 1, gitUrl.indexOf('.git'))


/**
 *  clone modular from git
 *  ----------------------
 *  input  : list of git url
 *  return : list of path folder modular
 *  ----------------------
 */
const gitClone = (modularListUrl) => {

  // git clone with node js
  modularListUrl.map(cur => {
    const spinner = Loading()
    const gitUrl = cur.slice(0, cur.indexOf('#'))
    const getModuleName = getModuleNameByUrl(gitUrl)
    const branch = cur.slice(cur.indexOf('#')+1)

      spinner.text = 'Cloning: '+cur
      spinner.start()
      function executeCmd(command, args, options) {
        var process = cp.spawn(command, args, options);
          var stdout = '', stderr = '';
          process.stdout.on('data', function (data) { stdout += data; });
          process.stderr.on('data', function (data) { stderr += data; });
          process.on('close', function (code) {
              spinner.stop()
              console.log(stdout);
              console.error(stderr);
          });
      }
      return executeCmd('git', ['clone', '-b', branch, gitUrl]);
  })
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
  // const gitUrl = cur.slice(0, cur.indexOf('#'))
  // const getModuleName = getModuleNameByUrl(modularListUrl)
  const result = modularListUrl.map(url => {    
    const getModuleName = getModuleNameByUrl(url.slice(0, url.indexOf('#')))
    // return gitPackageJson(currentPath+'/'+getModuleName, (err, data) => {
    //   console.log(err || data)
      
    // })
    return currentPath+'/'+getModuleName
  })
  
  // getPathList.map()// gitPackageJson
  // console.log(url)
  return checkVersion(result)
}


module.exports = {
  printHeader,
  gitClone,
  findModularFromCurrentPath,
  Loading
}
