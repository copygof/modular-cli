
const setConfig = (module = []) => {
  const configModule = [
    // 'git@bitbucket.org:dotography-code/galileo.git',
    // 'git@bitbucket.org:dotography-code/modular-authentication.git',
    'https://gitlab.com/copygof/cilnic-student.git#feature/stock',
    'https://gitlab.com/copygof/cilnic-student.git#feature/stock',
    'https://gitlab.com/copygof/cilnic-student.git#feature/stock',
  ]
  return module.length ? module : configModule
}

module.exports = setConfig
