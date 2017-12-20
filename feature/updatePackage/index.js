const chalk = require('chalk')
const fs = require('fs')
const inquirer = require('inquirer')
const listPackage = require('../checkVersion/listPackage')
const beautify = require('js-beautify').js_beautify
const { convertCallBackToPromise } = require('../../utils')

const readFile = convertCallBackToPromise(fs.readFile)
const writeFile = convertCallBackToPromise(fs.writeFile)
const readdirSync = convertCallBackToPromise(fs.readdirSync)

const updatePackage = () => {
  const questions = {
    type: 'list',
    name: 'packageName',
    message: 'What package do you want to upgrade?',
    choices: listPackage
  }
  const questionsVersion = {
    type: 'input',
    name: 'version',
    message: 'Version number?'
  }
  inquirer.prompt([questions, questionsVersion])
  .then(({ packageName, version }) => {
    // packageName
    // version
    // TODO read and write package.json
    const currentPath = process.cwd()
    const pathModules = fs.readdirSync(currentPath)
    pathModules.map(mn => {
      readFile(currentPath+'/'+mn+'/package.json', 'utf8')
      .then(data => {
        const objPkgs = JSON.parse(data)
        const getPackageForChange = objPkgs.dependencies[packageName] || objPkgs.devDependencies[packageName] || null
        if (getPackageForChange) {
          const isDev = objPkgs.devDependencies[packageName] ? 'devDependencies' : 'dependencies'
          const newResult = objPkgs
          newResult[isDev][packageName] = version
          // console.log('newResult', newResult)
          // TODO write package.json
          // console.log(currentPath+'/'+mn+'/package.json')
          // console.log(JSON.stringify(newResult))
          return writeFile(currentPath+'/'+mn+'/package.json', `${beautify(JSON.stringify(newResult), { indent_size: 2 })}`) 
        }
      })
      .catch(err => {
        console.log('err', err)
      })
    })
    // console.log('packageName', packageName)
    // console.log('version', version)
    // console.log('pathModules', pathModules)
  })
}

module.exports = updatePackage