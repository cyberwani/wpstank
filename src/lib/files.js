/**
 * Files.js
 * Module for creating and managing files and directories
 */

var fs = require('fs')
    , path = require('path')
    , mkdir = require('mkdirp') ;

var Files = function() {

    this.init = function() {
        return {
            add: this.add ,
            rm: this.rm 
        }
    };

    // Creates a directory
    this.mkdir = function( filePath, callback ) {
        mkdir.sync( path.dirname( filePath ) );
    };

    // Writes content to a file
    this.add = function( filePath, content ) {
        this.mkdir( filePath );
        fs.writeFileSync( filePath, content);
    };

    // Remove a file 
    this.rm = function( filePath ) {
        try {
            fs.unlinkSync( filePath );
        } catch(e) {}
    };

    // read a file
    this.read = function( filePath ) {
        if( fs.existsSync( filePath ) ) 
            return fs.readFileSync( filePath, "UTF-8" );
        return "" ;
    };

    this.init();
}

exports = module.exports = Files;
