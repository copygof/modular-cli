const chalk = require('chalk')
const figlet = require('figlet')


/**
 * Print Banner Head line
 * ----------------------
 */

const printHeader = (cb = () => {}) => {
  figlet.text('Modular kit cli', (err, data) => {
    if (err) {
        console.log('Something went wrong...')
        console.dir(err)
        return
    }
    console.log('\x1Bc')
    console.log(chalk.hex('#ff5000')(data))
    console.log(chalk.hex('#0030ff')('----------------------------------------------------------------->'))
    cb()
  });
}


module.exports = {
  printHeader
}
