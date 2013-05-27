
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
        'rc' : '.wpstankrc' ,
        'dir' : '.wpstank/' ,
        'postType': 'library/php/cpt/',
        'taxonomy': 'library/php/taxonomy/'
    };

    this.file = new Files;
    this.template = new Templates;

    this.phpFile = function( str ) {
        return [ inflection.underscore( str ), '.php' ].join('').replace(/_/g, '-');
    };

};

// create a file
WPStank.prototype.init = function() {
    this.file.add( path.join( process.cwd() , this.defaults.rc ) , JSON.stringify( this.defaults, null, 4 ) );
    for( template in this.template ) {
        this.file.add( path.join(process.cwd(), this.defaults.dir, this.phpFile( template ) ), this.template[template] );
    }
};

// Expose the stank
exports = module.exports = WPStank;
