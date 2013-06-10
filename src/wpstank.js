
// Module dependencies
var inflection = require('inflection')
    , _ = require('underscore')
    , fs = require('fs')
    , path = require('path')
    , Files = require('./lib/files');

var Templates = function() {
    this.postType = fs.readFileSync( path.join(__dirname, 'templates', 'post-type.php'), 'UTF-8' );
    this.taxonomy = fs.readFileSync( path.join(__dirname, 'templates', 'taxonomy.php'), 'UTF-8' );
    this.shortcode = fs.readFileSync( path.join(__dirname, 'templates', 'shortcode.php'), 'UTF-8' );
};

var WPStank = function() {

    this.settings = function(){
        var rc = this.file.read( this.rc );
        rc = !!rc ? JSON.parse( rc ) : {} ;
        return _.extend( {}, this.defaults, rc );
    };

    this.rc = '.wpstank.json' ,
    this.dir = '.wpstank' ,
    this.defaults = {
        'types' : {
            'postType': path.join( 'library', 'php', 'cpt' ) ,
            'taxonomy': path.join( 'library', 'php', 'taxonomy' ) ,
            'shortcode': path.join( 'library', 'php', 'shortcode' ) 
        }
    };

    this.updateSettings = function( settings ){
        return this.file.write( this.rc, JSON.stringify( _.extend( {}, this.settings() , settings ), null, 4 ) );
    };

    this.file = new Files;
    this.template = new Templates;

    this.phpFile = function( str ) {
        return [ inflection.underscore( str ), '.php' ].join('').replace(/_/g, '-');
    };

    this.filePath = function( name, type ) {
        return path.join( this.settings().types[type], this.phpFile( name ) );
    };

};

// init 
WPStank.prototype.init = function() {
    this.file.write( path.join( process.cwd() , this.rc ) , JSON.stringify( this.settings(), null, 4 ) );
    for( template in this.template ) {
        this.file.write( path.join(process.cwd(), this.dir, this.phpFile( template ) ), this.template[template] );
    }
};

// transform resource names
WPStank.prototype.name = function( name, type ) {
    var str = "";
    switch( type ) {
        case 'singular':
            str = inflection.singularize( name );
            str = inflection.capitalize( str );
            break;
        case 'plural':
            str = inflection.pluralize( name );
            str = inflection.capitalize( str );
            break;
        case 'slug':
            str = name.toLowerCase().replace( /[ \-\s]/g, '_' );
            break;
        case 'dashed':
            str = inflection.singular( name.toLowerCase().replace( /[ _\s]/g, '-' ) );
            break;
    }
    return str ;
}
// fetch a resource
WPStank.prototype.get = function( type ) {
    return this.file.read( path.join( this.dir, this.phpFile( type ) ) );
}

// add a resource 
WPStank.prototype.create = function( name, type ) {
    var file = this.get( type )
        .replace( new RegExp( '{{' + inflection.pluralize( type ) + '}}', 'g' ), this.name( name, 'plural' ) )
        .replace( new RegExp( '{{' + inflection.singularize( type ) + '}}', 'g' ), this.name( name, 'singular' ) )
        .replace( new RegExp( '{{' + inflection.singularize( type ) + '-slug}}', 'g' ), this.name( name, 'slug' ) );
    this.file.write( this.filePath( name, type ), file );
}

// remove a resource 
WPStank.prototype.destroy = function( name, type ) {
    this.file.rm( path.join( this.settings().types[ type ], this.phpFile( name ) ) );
}

// Expose the stank
exports = module.exports = WPStank;
