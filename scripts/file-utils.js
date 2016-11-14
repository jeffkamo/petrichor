var fs = require('fs');
var chalk = require('chalk');

var readFile = function(path) {
    return fs.readFileSync(path, 'utf8');
};

// fileUtils.jsonRead(__dirname + '/../package.json');
var jsonRead = function(path) {
    var text;
    var parsed;

    try {
        text = readFile(path);
        parsed = JSON.parse(text);
    } catch(error) {
        console.log(chalk.red('Problem in jsonRead() in: ' + __dirname + '/file-utils.js'));
        console.log(chalk.red(error));
    }

    return parsed;
};

// Example Usage
//
// var fileToWrite = __dirname + '/thing.json';
// jsonWrite(fileToWrite)(jsonObject);
const jsonWrite = function(path) {
    return function(contents) {
        return writeFile(path, JSON.stringify(contents, null, 2));
    }
}

const writeFile = function(path, contents) {
    fs.writeFileSync(path, contents, 'utf8');
};

module.exports = {
    readFile,
    jsonRead,
    jsonWrite
}
