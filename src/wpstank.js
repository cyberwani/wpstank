
// Module dependencies
var inflection = require('inflection')
    , fs = require('fs')
    , Files = require('./lib/files');

// Expose the stank
wxports = module.exports = WPStank;

var Templates = function() {
    this.postType = fs.readFileSync( './templates/post-type.php', 'UTF-8' );
    this.taxonomy = fs.readFileSync( './templates/taxonomy.php', 'UTF-8' );
};

var WPStank = function() {

    this.defaults = {
        'library': 'library/php' ,
        'postType': 'library/php/cpt',
        'taxonomy': 'library/php/taxonomy'
    };

    this.files = new Files;
    this.template = new Templates;

};
