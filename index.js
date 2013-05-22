#!/usr/bin/env node

var program = require('commander'),
    stank = require('./src/wpstank.js');

program
    .version('0.0.0')
    .option('-g, --generate', 'Generate a file')
    .option('-d, --delete', 'Delete a file')
    .option('-p, --post-type [type]', 'Post Type')
    .option('-t, --taxonomy', 'Taxonomy');

program
    .command('init')
    .description('Setup stank')
    .action(function(){
    });

program.parse( process.argv );

if( program.generate ) {
    if( program.postType ) {
        // Is a post type specified?
        if( program.postType === true )
            return console.log( "No post type was specified" );
    }
}
