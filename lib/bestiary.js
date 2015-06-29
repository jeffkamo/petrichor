var Spreadsheet = require('edit-google-spreadsheet');
var Enemy = require('./Enemy');
var bestiary = {};

Spreadsheet.load({
    debug: true,
    spreadsheetId: '1azE5mHN2ftI-KhilkI2Lcupd3E3JcK6XWsQM7wpWpA8',
    worksheetName: 'Bestiary',
    worksheetId: 'od6',
    oauth: {
        email: '323823310288-h9d1npe4bu5ldkpkkalr0utof65c4s71@developer.gserviceaccount.com',
        keyFile: __dirname + '/../cert/fftrainwreck.pem'
    }
}, function sheetReady(err, spreadsheet) {
    if (err) { throw err; }

    spreadsheet.receive(function(err, rows, info) {
        if (err) { throw err; }

        for (var currentRow in rows) {

            // Skip the first row, it's just a set of labels
            if (currentRow > 1) {

                // Build a class for the new creature in a closure to ensure
                // the new class variable is created fresh after each iteration.
                (function() {
                    var name = rows[currentRow]['1'];
                    var slug = rows[currentRow]['2'];
                    var region = rows[currentRow]['3'];
                    var description = rows[currentRow]['4'];
                    var level = rows[currentRow]['5'];
                    var strength = rows[currentRow]['7'];
                    var intelligence = rows[currentRow]['8'];
                    var vitality = rows[currentRow]['9'];
                    var arcana = rows[currentRow]['10'];
                    var defense = rows[currentRow]['11'];
                    var mystica = rows[currentRow]['12'];

                    var Creature = function(options) {
                        Enemy.call(this, {
                            name:        options.name          || name,
                            slug:        options.slug          || slug,
                            region:      options.region        || region,
                            description: options.description   || description,
                            level:       options.level         || level,

                            strength:     options.strength     || strength,
                            intelligence: options.intelligence || intelligence,
                            vitality:     options.vitality     || vitality,
                            arcana:       options.arcana       || arcana,
                            defense:      options.defense      || defense,
                            mystica:      options.mystica      || mystica,
                        });
                    };

                    // Fix the prototype and constructors for all the types of Enemy classes.
                    // Although I bet this is problematic, as this is done for every instance of
                    // any of these enemy classes... something's probably going to go wrong.
                    Creature.prototype = Object.create(Enemy.prototype);
                    Creature.prototype.constructor = Creature;

                    // Add the newly created class to the bestiary under the new
                    // creature's name!
                    bestiary[slug] = Creature;
                })();
            }
        }
    });
});

module.exports = bestiary;
