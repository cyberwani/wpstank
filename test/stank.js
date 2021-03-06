
var WPStank = require('../')
    , inflection = require('inflection')
    , stank = new WPStank
    , fs = require('fs')
    , path = require('path')
    , should = require('should');

// Helper functions
var cleanInit = function() {
    clean();
    stank.init();
}

var clean = function() {
    stank.file.rm( stank.rc )
    stank.file.rm( stank.dir )
};

// change into the testing dir
process.chdir( __dirname );

// Tests
describe("Stank files", function(){
    before( clean );

    describe("Initializer", function(){
        describe("Before init", function(){
            it("Is empty before a test", function(){
                fs.existsSync( stank.rc ).should.eql( false );
            });
        });

        describe("After init", function(){
            // remove any files
            beforeEach( cleanInit );
            after( clean );

            it("Creates a preference file", function(){
                fs.existsSync( stank.rc ).should.eql( true );
            });

            it("Creates a preference directory", function(){
                fs.existsSync( stank.rc ).should.eql( true );
            });

            it("Directory preference files are templates", function(){
                for( template in stank.template ) {
                    file = fs.readFileSync( path.join( stank.dir, stank.phpFile(template) ), 'UTF-8' );
                    file.should.eql( stank.template[template] );
                }
            });
        });
    });

    describe("Settings", function(){
        beforeEach( cleanInit );

        it("Can modify settings", function(){
            var settings = stank.settings() ;
            settings.types.posttype = path.join( 'library', 'special-posttype-dir' ) ;
            stank.file.write( stank.rc, JSON.stringify( settings, null, 4 ) );
            settings.should.eql( stank.settings() );
        });

        it("Can change posttype dir", function(){
            stank.create( "job", "posttype" );
            fs.existsSync( path.join( stank.settings().types.posttype, 'job.php' ) ).should.eql( true );
            var settings = stank.settings();
            settings.dir = path.join( 'library', 'special-posttype-dir' ) ;
        });
    });
    describe("File System", function(){
        beforeEach( function(){
            stank.create( "job", "posttype" );
        });
        describe( "Create / Destroy", function(){

            it("can create a file", function(){
                fs.existsSync( path.join( stank.settings().types.posttype, 'job.php' ) ).should.eql( true );
            });
            it("can destroy a file", function(){
                stank.destroy( "job", "posttype" );
                fs.existsSync( path.join( stank.settings().types.posttype, 'job.php' ) ).should.eql( false );
            });
        });
        describe( "Exists", function(){
            it("knows if a resource exists", function(){
                stank.exist( "job", "posttype" ).should.eql( true );
            });
            it("knows if a resource does not exists", function(){
                stank.exist( "nonExistantFile", "posttype" ).should.eql( false );
            });
        });
    });

    describe("Templates", function(){
        beforeEach( cleanInit );

        it("have correct handlebar markup", function(){
            for( type in stank.settings().types ) {
                var file = stank.get( type ) ,
                    left = file.match(/{{/g) ,
                    right = file.match(/}}/g) ;

                left.length.should.eql( right.length );
            }
        });

        describe("Default settings", function(){
            it("includes a custom post type", function(){
                (typeof stank.template.posttype).should.eql("string")
                stank.template.posttype.should.not.have.lengthOf(0)
            });
            it("includes a taxonomy", function(){
                (typeof stank.template.taxonomy).should.eql("string")
                stank.template.taxonomy.should.not.have.lengthOf(0)
            });
            it("includes a shortcode", function(){
                (typeof stank.template.shortcode).should.eql("string")
                stank.template.shortcode.should.not.have.lengthOf(0)
            });
            it("includes a widget", function(){
                (typeof stank.template.widget).should.eql("string")
                stank.template.widget.should.not.have.lengthOf(0)
            });
        });
        describe("Interactions", function(){
            it("Are read from the preferences dir", function(){
                var types = [ 'posttype', 'taxonomy', 'shortcode', 'widget'];
                for( i = 0; i < types.length; i++ ) {
                    stank.get( types[i] ).should.eql( fs.readFileSync( path.join( stank.dir, stank.phpFile( types[i] ) ), 'UTF-8' ) );
                }
            });

            it("returns the resource as a string before it replaces", function(){
                ( typeof stank.get( 'posttype' ) ).should.eql( "string" );
            });
        });
    });

    describe("Generator", function(){
        before( cleanInit );

        describe("Accuracy", function(){
            it("correctly generates a post", function(){
                var names = [ 'job', 'event', 'something else' ];
                for( type in stank.settings().types ) {
                    for( var i = 0; i < names.length; i++ ) {
                        name = names[i]
                        stank.create( name, type );
                        var file = stank.file.read( path.join( stank.settings().types[type], name + '.php' ) );
                        (!!file.match( new RegExp( '{{' + type + '}}' ) )).should.eql( false );
                        (!!file.match( new RegExp( '{{' + inflection.pluralize( type ) + '}}' ) )).should.eql( false );
                        (!!file.match( new RegExp( '{{' + type + '-slug}}' ) )).should.eql( false );
                    }
                }
            });
        });
    });
});
