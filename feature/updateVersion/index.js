const inquirer = require('inquirer')
const setConfig = require('../../config/configModular.js')
const { gitClone, findModularFromCurrentPath } = require('../../common')
const pksList = require('../checkVersion/pkg-list-update-version.js')

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


// module.exports = [{
//   "Authentication": ""
// }, {
//   "Bank": ""
// }, {
//   "Galileo": ""
// }, {
//   "MarketPlace": ""
// }, {
//   "Notification": ""
// }, {
//   "Social": ""
// }, {
//   "biometrics": ""
// }, {
//   "js-money": ""
// }, {
//   "kyc": ""
// }, {
//   "lodash": ""
// }, {
//   "mascot": ""
// }, {
//   "md5": ""
// }, {
//   "moment": ""
// }, {
//   "normalizr": ""
// }, {
//   "prop-types": ""
// }, {
//   "ramda": ""
// }, {
//   "react": ""
// }, {
//   "react-native": ""
// }, {
//   "react-native-app-link": ""
// }, {
//   "react-native-camera": ""
// }, {
//   "react-native-check-box": ""
// }, {
//   "react-native-config": ""
// }, {
//   "react-native-datepicker": ""
// }, {
//   "react-native-device-info": ""
// }, {
//   "react-native-drawer": ""
// }, {
//   "react-native-fbsdk": ""
// }, {
//   "react-native-fetch-blob": ""
// }, {
//   "react-native-htmlview": ""
// }, {
//   "react-native-i18n": ""
// }, {
//   "react-native-image-resizer": ""
// }, {
//   "react-native-image-to-base64": ""
// }, {
//   "react-native-linear-gradient": ""
// }, {
//   "react-native-material-kit": ""
// }, {
//   "react-native-md-textinput": ""
// }, {
//   "react-native-permissions": ""
// }, {
//   "react-native-router-flux": ""
// }, {
//   "react-native-scale360-native-module": ""
// }, {
//   "react-native-view-shot": ""
// }, {
//   "react-redux": ""
// }, {
//   "redux": ""
// }, {
//   "redux-form": ""
// }, {
//   "redux-logger": ""
// }, {
//   "redux-persist": ""
// }, {
//   "redux-persist-transform-filter": ""
// }, {
//   "redux-thunk": ""
// }, {
//   "babel-eslint": ""
// }, {
//   "babel-jest": ""
// }, {
//   "babel-preset-react-native": ""
// }, {
//   "enzyme": ""
// }, {
//   "enzyme-adapter-react-16": ""
// }, {
//   "eslint": ""
// }, {
//   "eslint-config-airbnb-base": ""
// }, {
//   "eslint-plugin-import": ""
// }, {
//   "eslint-plugin-jsx-a11y": ""
// }, {
//   "eslint-plugin-react": ""
// }, {
//   "jest": ""
// }, {
//   "nock": ""
// }, {
//   "react-dom": ""
// }, {
//   "react-test-renderer": ""
// }, {
//   "redux-mock-store": ""
// }, {
//   "sherlockholmes": ""
// }]