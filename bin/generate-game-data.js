var connect = require('../scripts/connect');
var fileUtils = require('../scripts/file-utils');
var chalk = require('chalk');

var write = function(filename, object) {
    var pathToWrite = __dirname + '/../app/data/' + filename;

    try {
        fileUtils.jsonWrite(pathToWrite)(object);
    } catch(error) {
        console.log(chalk.red('Problem in: ' + __dirname + '/generate-game-data.js'));
        console.log(chalk.red(error));
    }
}

setTimeout(function() {
    var abilities = connect('jobAbilities');
    var characters = connect('characters');
    var bestiary = connect('bestiary');
    var script = connect('script');

    write('abilities.json', abilities);
    write('characters.json', characters);
    write('bestiary.json', bestiary);
    write('script.json', script);
}, 2000);
