#!/usr/bin/env node

var program = require('commander'),
    inflection = require('inflection'),
    fs = require('fs'),
    defaults = {
        'library': 'library/php' ,
        'postType': 'library/php/cpt',
        'taxonomy': 'library/php/taxonomy'
    },
    postType = fs.readFileSync( './templates/post-type.php', 'UTF-8' ),
    taxonomy = fs.readFileSync( './templates/taxonomy.php', 'UTF-8' );

var Frank = function() {
};

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
        fs.writeFile('.wpcli', JSON.stringify( defaults, null, 2 ));
    });

program.parse( process.argv );

if( program.generate ) {
    if( program.postType ) {
        // Is a post type specified?
        if( program.postType === true )
            return console.log( "No post type was specified" );

        var singular = inflection.singularize( program.postType ),
            slug = inflection.underscore( singular ).replace(/\s+/g, '_') ,
            properSingular = inflection.titleize( singular ) ,
            properPlural = inflection.pluralize( properSingular ) ,
            cpt = postType
                .replace(/\{\{post-type-slug\}\}/g, slug)
                .replace(/\{\{post-types\}\}/g, properPlural)
                .replace(/\{\{post-type\}\}/g, properSingular);
        fs.writeFile( defaults.postType + '/' + slug + '.php', cpt );
    }
}
