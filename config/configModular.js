
const setConfig = (module = []) => {
  const configModule = [
    'git@bitbucket.org:dotography-code/galileo.git',
    'git@bitbucket.org:dotography-code/modular-authentication.git',
  ]
  return [].concat(module, configModule)
}

module.exports = setConfig
