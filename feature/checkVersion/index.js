const gitPackageJson = require('git-package-json')
const columnify = require('columnify')
const chalk = require('chalk')
const opn = require('opn')
const ora = require('ora')
const fs = require('fs')
const inquirer = require('inquirer')
const npmlog = require('npmlog')
const ColorScheme = require('color-scheme')
const { Loading } = require('../../common.js')
const setConfig = require('../../config/configModular.js')
const { convertCallBackToPromise } = require('../../utils')
const templateHtml = require('./template')

const fetchPackageJson = convertCallBackToPromise(gitPackageJson)
const scheme = new ColorScheme;
scheme.from_hue(21).scheme('triade').variation('soft')
const color = scheme.colors();

const printResult = (data) => {
    // if modular more than 6 then open report from browser
    const writeReportHtml = convertCallBackToPromise(fs.writeFile)
    const thead = [data[0]].map(value => (`
        <tr>
            ${Object.keys(value).map(k => `<td style="color: #03a9f4; border: 1px solid #19536f">${k}</td>`).join('')}
        </tr>
    `)).join('')


    const colors = [
        '#A7A1AE',
        // '#323c50',
        // '#46aadb',
        '#fcd000',
        '#ff3c41',
        '#E8720C',
        '#A00CE8',
    ].concat(color)
        
    
    const tbody = data.map(value => {
        const tempKeys = Object.keys(value).slice(1).map(v => value[v]).reduce((prev, cur) => prev.some(v => v === cur) ? prev : prev.concat([cur]), [])
        const tempKeysWithColor = tempKeys.filter(v => v !== '-').reduce((prev, cur) => (
            Object.assign({}, prev, {
                [cur]: colors.reduce((p, c) => (Object.keys(prev).some(v => prev[v] === c) ? p : p.concat([c])), [])[0]
            })
        ), {})
        return (`
        <tr>
            ${Object.keys(value).map((k, i) => `<td style="color:  ${i === 0 ? '#46aadb' : tempKeysWithColor[value[k]] || '#A7A1AE'}; border: 1px solid #19536f;">${value[k]}</td>`).join('')}
        </tr>
    `)
    }).join('')
    // is-bordered is-striped is-narrow is-fullwidth
    writeReportHtml(__dirname+'/report.html', templateHtml((`
        <table class="table is-bordered" style="background-color: #1F2739;">
            <thead>${thead}</thead >
            <tbody style="background-color: #1F2739;">${tbody}</tbody>
        </table>
    `)),  'utf8')
    .then(() => opn(__dirname+'/report.html', {app: ['chrome']}))
}



const checkVersion = (getPackage = setConfig()) => {
    // queue async fetch pkg
    const spinner = ora()
    spinner.start();
    spinner.spinner = {
        "interval": 80,
        "frames": ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
    }
    getPackage.reduce((prev, cur, i) => {        
        return (
            prev.then(data => {
                spinner.text = 'Fetching: '+cur
                return fetchPackageJson(cur)
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
            })
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
        const getPkgName = result.map(value => ({ [value[Object.keys(value)[0]]]: '' }))
        const writeFileJS = convertCallBackToPromise(fs.writeFile)
        const content = `module.exports = ${JSON.stringify(getPkgName)}`
        const contents = `module.exports = ${JSON.stringify(result.map(value => value[Object.keys(value)[0]]))}`
        writeFileJS(__dirname+'/pkg-list-update-version.js', content,  'utf8')
        writeFileJS(__dirname+'/listPackage.js', contents,  'utf8')
        return printResult(result)
    })
}

module.exports = checkVersion