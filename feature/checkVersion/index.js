const gitPackageJson = require('git-package-json')
const columnify = require('columnify')
const chalk = require('chalk')
const opn = require('opn')
const fs = require('fs')
const inquirer = require('inquirer')
const ora = require('ora');
const npmlog = require('npmlog');
const setConfig = require('../../config/configModular.js')
const { convertCallBackToPromise } = require('../../utils')
const templateHtml = require('./template')

const fetchPackageJson = convertCallBackToPromise(gitPackageJson)


const printResult = (data) => {
    // if modular more than 6 then open report from browser
    const writeReportHtml = convertCallBackToPromise(fs.writeFile)
    const thead = [data[0]].map(value => (`
        <tr>
            ${Object.keys(value).map(k => `<td style="color: #03a9f4; border: 1px solid #19536f">${k}</td>`).join('')}
        </tr>
    `)).join('')
    const tbody = data.map(value => (`
        <tr>
            ${Object.keys(value).map((k, i) => `<td style="color:  ${i === 0 ? '#46aadb' : '#A7A1AE'}; border: 1px solid #19536f;">${value[k]}</td>`).join('')}
        </tr>
    `)).join('')
    // is-bordered is-striped is-narrow is-fullwidth
    writeReportHtml(__dirname+'/report.html', templateHtml((`
        <table class="table is-bordered" style="background-color: #1F2739;">
            <thead>${thead}</thead >
            <tbody style="background-color: #1F2739;">${tbody}</tbody>
        </table>
    `)),  'utf8')
    .then(() => opn(__dirname+'/report.html', {app: ['chrome']}))
}

const checkVersion = () => {
    const getPackage = setConfig()
    const spinner = ora()
    spinner.start();
    spinner.spinner = {
        "interval": 80,
        "frames": ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
    }
    // queue async fetch pkg
    getPackage.reduce((prev, cur, i) => {
        spinner.text = 'Fetching: '+cur
        return (
            prev.then(data => (
                fetchPackageJson(cur)
                .then(pkg => [].concat(data, [pkg]))
                .then((pkg) => {
                    spinner.succeed([chalk.white('check-version-depend')+' '+chalk.green('modular')+' '+chalk.magenta(pkg[pkg.length - 1].name)])
                    i !== getPackage.length - 1
                    ? spinner.start()
                    : spinner.stop()
                    return pkg
                })
                .catch((err) => {
                    spinner.fail(['Fail to fetch '+cur +' '+err])
                    return data
                })
            ))
        )
    }, Promise.resolve([]))
    .then(pkgs => {
        const filterDepend = pkgs.map(({ name, dependencies, devDependencies }) => ({
            name,
            dependencies: Object.assign({}, dependencies, devDependencies)
        }))

        const tempAllDepend = Object.keys(filterDepend
            .map(({ dependencies }) => dependencies)
            .reduce((prev, cur) => Object.assign({}, prev, cur), {})
        )
      
        const result = tempAllDepend.map(packageName => (
            Object.assign({}, { packageName },
            filterDepend.reduce((prev, cur) => (
                Object.assign({}, prev, {
                [cur.name]: cur.dependencies[packageName] || '-'
                })
            ), {})
            )
        ))
        printResult(result)
    })
}

module.exports = checkVersion