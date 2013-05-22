/**
 * Files.js
 * Module for creating and managing files and directories
 */
(function( root ){

    var fs = require('fs'),
        path = require('path'),
        mkdirp = require('mkdirp'),
        pubSub = require('node-pubsub');

    var Files = function() {

        var self = this;

        this.e = pubSub;

        this.init = function() {
            this.e.subscribe( 'files/exists', this.exists );
            this.e.subscribe( 'files/mkdir', this.mkdir );
            this.e.subscribe( 'files/write', this.write );
            this.e.subscribe( 'files/exit', this.exit );
            return {
                add: this.add
            }
        };

        // Checks to see if path is a file
        this.isFile = function( filePath ) {
            stats = fs.lstatSync( filePath );
            return stats.isFile();
        };
        // Checks to see if path is a dir
        this.isDir = function( filePath ) {
            stats = fs.lstatSync( filePath );
            return stats.isDir();
        };

        // Creates a directory
        this.mkdir = function( filePath ) {
        };

        this.add = function( filePath ) {
            this.e.publish( 'files/mkdir', [ filePath ] );
        };

        this.explode = function( filePath ) {
        };

        this.init();
    }

    if( exports === "undefined" ) root.Files = Files;

    module.exports = Files;
})( this )
