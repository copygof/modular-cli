const gitPackageJson = require('git-package-json')
const columnify = require('columnify')
const chalk = require('chalk')
const setConfig = require('../../config/configModular.js')

const checkVersion = () => {
    
    const listDependencies = []
    const getPackage = setConfig()
    const fnCheck = () => new Promise((resolve, reject) => {
        
    })
    getPackage.map(url => gitPackageJson(url, function (err, data) {
        // console.log(err || data);
        const getData = {
            name: data.name,
            dependencies: Object.assign({}, data.dependencies, data.devDependencies)
        }
       
        listDependencies.push(getData)
        // console.log(chalk.green(columnify(getData.dependencies, {columns: ['MODULE', 'Version']})))
    }))
    var datass = [
            
        {
            packageName: chalk.red('react-native'),
            galileo: '0.49.5',
            authentication: '0.47.2',
        },
        {
            packageName: 'react',
            galileo: '0.36.0',
            authentication: '0.40.0',
        },
    ]

    console.log(chalk.green(columnify(datass)))
   //  console.log('listDependencies', listDependencies)
}

module.exports = checkVersion

