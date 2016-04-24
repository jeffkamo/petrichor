// Script
// ===
//
// The script is the story, narrative and dialogue for the entire story.

function Script(script) {
    this.dialogue = this.parseDialogue(script)
}

Script.prototype.parseDialogue = function(script) {
    var dialogues = [];
    var dialogue;

    for (var row in script) {
        if (row === '1') { continue; } // skip the first row of labels

        dialogue = {};

        for (var column in script[row]) {
            dialogue[script[1][column]] = script[row][column];
        }

        dialogues.push(new Dialogue(dialogue));
    }

    return dialogues;
}

function Dialogue(options) {
    this.name = options.name;
    this.text = options.text;
    this.type = options.type;
    this.speed = options.speed;
    this.trigger = options.trigger;
    this.options = options.options;
}

module.exports = Script;
