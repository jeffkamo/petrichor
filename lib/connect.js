var Spreadsheet = require('edit-google-spreadsheet');

var id = {
    bestiary: 'od6',
    characters: 'o24o4q7',
    jobs: 'o19czd0',
    jobAbilities: 'o110kgv',
    mechanics: 'op16j80'
};

var sheets = {};

var connect = function(sheet, id) {
    var sheet;

    Spreadsheet.load({
        debug: false,
        spreadsheetId: '1azE5mHN2ftI-KhilkI2Lcupd3E3JcK6XWsQM7wpWpA8',
        worksheetId: id,
        oauth: {
            email: '323823310288-h9d1npe4bu5ldkpkkalr0utof65c4s71@developer.gserviceaccount.com',
            keyFile: __dirname + '/../cert/fftrainwreck.pem'
        }
    }, function sheetReady(err, spreadsheet) {
        if (err) { throw err; }

        spreadsheet.receive(function(err, rows, info) {
            if (err) { throw err; }

            sheets[sheet] = rows;

        });
    });
};

connect('bestiary', id.bestiary);
connect('characters', id.characters);
connect('jobs', id.jobs);
connect('jobAbilities', id.jobAbilities);
connect('mechanics', id.mechanics);

module.exports = function(sheet) {
    return sheets[sheet];
};
