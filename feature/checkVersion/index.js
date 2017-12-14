const gitPackageJson = require("git-package-json")

gitPackageJson("https://github.com/IonicaBizau/git-package-json", function (err, data) {
    console.log(err || data);
    // { name: 'git-stats',
    //   version: '2.9.2',
    //   description: 'Local git statistics including GitHub-like contributions calendars.',
    //   main: 'lib/index.js',
    //   ...
    //   _id: 'git-stats@2.9.2' }
});

// // Takes the repo from GitHub
// gitPackageJson("nuvipannu/ascii-heart", function (err, data) {
//     console.log(err || data);
//     // { name: 'ascii-heart',
//     //   version: '2.0.0',
//     //   description: 'Create ASCII hearts using Node.js.',
//     //   main: 'lib/index.js',
//     //   ...
//     //   _id: 'ascii-heart@2.0.0' }
// });

module.exports = gitPackageJson
