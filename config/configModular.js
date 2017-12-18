
const setConfig = (module = []) => {
  const configModule = [
    // 'git@bitbucket.org:dotography-code/galileo.git',
    // 'git@bitbucket.org:dotography-code/modular-authentication.git',

    // 'https://gitlab.com/copygof/cilnic-student.git#feature/stock',
    // 'https://gitlab.com/copygof/cilnic-student.git#feature/stock',
    // 'https://gitlab.com/copygof/cilnic-student.git#feature/stock',

    "git+ssh://git@bitbucket.org/dotography-code/shopbank-uk-mobile.git#integration",
    "git+ssh://git@bitbucket.org/dotography-code/modular-authentication.git#feature/update-version",
    "git+ssh://git@bitbucket.org/dotography-code/modular-bank.git#release/3.0.0",
    "git+ssh://bitbucket.org/dotography-code/galileo.git#feature/update-version",
    "git+ssh://git@bitbucket.org/dotography-code/modular-marketplace.git#release/3.0.0",
    "git+ssh://git@bitbucket.org/dotography-code/modular-notification.git#feature/update-version-fcm",
    "git+ssh://git@bitbucket.org:dotography-code/modular-social.git#feature/update-version",
    "git+ssh://git@bitbucket.org/dotography-code/modular-biometrics.git#feature/update-version",
    "git+ssh://git@bitbucket.org/dotography-code/auto-kyc-mobile.git#feature/update-version",
    // "git+ssh://git@bitbucket.org/dotography-code/scale360-native-module.git#feature/update-version",
    "git+ssh://git@bitbucket.org:dotography-code/animation.git#feature/update-version",
  ]
  return module.length ? module : configModule
}

module.exports = setConfig
