
const setConfig = (module = []) => {
  const configModule = [
    // 'git@bitbucket.org:dotography-code/galileo.git#feature/update-version',
    // 'git@bitbucket.org:dotography-code/modular-authentication.git',

    // 'https://gitlab.com/copygof/cilnic-student.git#feature/stock',
    // 'https://gitlab.com/copygof/cilnic-student.git#feature/stock',
    // 'https://gitlab.com/copygof/cilnic-student.git#feature/stock',
    
    "git@bitbucket.org:dotography-code/shopbank-uk-mobile.git#integration",
    "git@bitbucket.org:dotography-code/modular-authentication.git#develop",
    "git@bitbucket.org:dotography-code/modular-bank.git#develop",
    "git@bitbucket.org:dotography-code/galileo.git#develop",
    "git@bitbucket.org:dotography-code/modular-marketplace.git#develop",
    "git@bitbucket.org:dotography-code/modular-notification.git#develop",
    "git@bitbucket.org:dotography-code/modular-social.git#develop",
    "git@bitbucket.org:dotography-code/modular-biometrics.git#develop",
    "git@bitbucket.org:dotography-code/auto-kyc-mobile.git#develop",
    // "git@bitbucket.org:dotography-code/scale360-native-module.git#feature/update-version",
    "git@bitbucket.org:dotography-code/animation.git#develop",
  ]
  return module.length ? module : configModule
}

module.exports = setConfig
