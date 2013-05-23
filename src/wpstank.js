
// Module dependencies
var inflection = require('inflection')
    , fs = require('fs')
    , path = require('path')
    , Files = require('./lib/files');

var Templates = function() {
    this.postType = fs.readFileSync( path.join(__dirname, 'templates', 'post-type.php'), 'UTF-8' );
    this.taxonomy = fs.readFileSync( path.join(__dirname, 'templates', 'taxonomy.php'), 'UTF-8' );
};

var WPStank = function() {

    this.defaults = {
        'postType': 'library/php/cpt/',
        'taxonomy': 'library/php/taxonomy/'
    };

    this.file = new Files;
    this.template = new Templates;

};

// create a file
WPStank.prototype.init = function(  ) {
    this.file.add( '.wpstank', JSON.stringify( this.defaults, null, 4 ) );
};

// Expose the stank
exports = module.exports = WPStank;
