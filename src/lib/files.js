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
        this.mkdir( filePath, function(){
            fs.writeFile( filePath, content, function(err){
                if(err) throw err;
                console.log( "Added " + filePath );
            });
        });
    };

    // Remove a file 
    this.rm = function( filePath ) {
        fs.unlink( filePath, function(err){
            if(err) throw err;
            console.log( "Removed " + filePath );
        });
    };

    this.init();
}

exports = module.exports = Files;
