const inquirer = require('inquirer')
const setConfig = require('../../config/configModular.js')
const { gitClone, findModularFromCurrentPath } = require('../../common')

const getPackage = setConfig()
const mapPathWithBranch = (pkgs, branch) => pkgs.map(v => v+'#'+branch)

const updateVersion = () => {
  const questions = {
    type: 'list',
    name: 'selectType',
    message: 'What modular do you want to upgrade?',
    choices: [
      'All modular',
      'Select modular'
    ]
  }
  const questionSelectModular = {
    type: 'checkbox',
    name: 'selectModular',
    message: 'Select modular for update',
    choices: getPackage,
  }
  const questionsBranch = {
    type: 'list',
    name: 'selectBranch',
    message: 'Select branch for update (develop/master)?',
    choices: [
      'develop',
      'master',
      'default from path' // if true then not map branch when fetch git
    ]
  }
  const questionsCloneNew = {
    type: 'confirm',
    name: 'isCloneNew',
    message: 'Do you need to clone modular to new directory (git clone / find current path)?',
  }

  const updateAllModular = () => (
    inquirer.prompt([questionsBranch, questionsCloneNew])
    .then(({ selectBranch, isCloneNew }) => {
      // TODO map branch, clone git, select lib for update version
      const modularUrl = selectBranch !== 'default from path' ? mapPathWithBranch(getPackage, selectBranch) : getPackage
      const pathModular = isCloneNew ? gitClone(modularUrl) : findModularFromCurrentPath(modularUrl)
      // TODO
      // use func change version
    })
  )
  
  const updateSomeModular = () => (
    inquirer.prompt([questionSelectModular, questionsBranch, questionsCloneNew])
    .then(({ selectModular, selectBranch, isCloneNew }) => {
      // TODO map branch, clone git, select lib for update version
      // questionsCloneNew
      const modularUrl = selectBranch !== 'default from path' ? mapPathWithBranch(selectModular, selectBranch) : selectModular
      const pathModular = isCloneNew ? gitClone(modularUrl) : findModularFromCurrentPath(modularUrl)
      // TODO 
      // use func change version
    })
  )
  
  inquirer.prompt([questions]).then(({ selectType, }) => (
    selectType === 'All modular'
    ? updateAllModular()
    : updateSomeModular()
  ))
}

module.exports = updateVersion