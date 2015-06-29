var Enemy = require('./Enemy');
var bestiary = require('./bestiary');

function EnemyFactory() {}

EnemyFactory.prototype.create = function(options) {
    var enemyClass = bestiary[options.type];

    if (enemyClass == null) {
        return false;
    }

    return new enemyClass(options);
};

module.exports = new EnemyFactory();
