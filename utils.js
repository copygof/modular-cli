
/**
 *  function for convert callback to promise style
 * @param {*function callback} f 
 */
const convertCallBackToPromise = f => (...args) => new Promise((resolve, reject) => (
  f(...args, (err, data) => err ? reject(err) : resolve(data))
))

module.exports = {
  convertCallBackToPromise
}