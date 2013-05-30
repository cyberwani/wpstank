
var WPStank = require('../')
    , stank = new WPStank
    , fs = require('fs')
    , path = require('path')
    , should = require('should');

process.chdir( __dirname );

describe("Initializer", function(){
    describe("Before init", function(){
        it("Is empty before a test", function(){
            fs.existsSync( stank.defaults().rc ).should.eql( false );
        });
    });

    describe("After init", function(){
        // remove any files
        var clean = function() {
            stank.file.rm( stank.defaults().rc )
            stank.file.rm( stank.defaults().dir )
        };
        beforeEach(function(){
            clean();
            stank.init();
        });
        after( clean );

        it("Creates a preference file", function(){
            fs.existsSync( stank.defaults().rc ).should.eql( true );
        });

        it("Creates a preference directory", function(){
            fs.existsSync( stank.defaults().rc ).should.eql( true );
        });

        it("Directory preference files are templates", function(){
            for( template in stank.template ) {
                file = fs.readFileSync( path.join( stank.defaults().dir, stank.phpFile(template) ), 'UTF-8' );
                file.should.eql( stank.template[template] );
            }
        });
    });
});

describe("Settings", function(){
    /*
    it("Can modify settings", function(){
        stank.init()
        fs.readFile( stank.defaults().rc, function( err, data ){
            var settings = JSON.parse( data );
            settings.types.postType = path.join( 'library', 'special-post-type-dir' );
            fs.writeFileSync( stank.defaults().rc, JSON.stringify( settings, null, 4), 'UTF-8' );
            stank.create( "job", "postType" );
            fs.existsSync( path.join( stank.defaults().types.postType, 'job.php' ) ).should.eql( true );
        });
        fs.existsSync( path.join( stank.defaults().types.postType, 'job.php' ) ).should.eql( true );
    });
    */
});
describe("File System", function(){
    describe( "Create / Destroy", function(){
        beforeEach( function(){
            stank.create( "job", "postType" );
        });

        it("can create a file", function(){
            fs.existsSync( path.join( stank.defaults().types.postType, 'job.php' ) ).should.eql( true );
        });
        it("can destroy a file", function(){
            stank.destroy( "job", "postType" );
            fs.existsSync( path.join( stank.defaults().types.postType, 'job.php' ) ).should.eql( false );
        });
    });
});

describe("Templates", function(){
    describe("Default settings", function(){
        it("includes a custom post type", function(){
            (typeof stank.template.postType).should.eql("string")
            stank.template.postType.should.not.have.lengthOf(0)
        });
        it("includes a taxonomy", function(){
            (typeof stank.template.taxonomy).should.eql("string")
            stank.template.taxonomy.should.not.have.lengthOf(0)
        });
    });
    describe("Interactions", function(){
        it("Are read from the preferences dir", function(){
            var types = [ 'postType', 'taxonomy' ];
            for( i = 0; i < types.length; i++ ) {
                stank.get( types[i] ).should.eql( fs.readFileSync( path.join( stank.defaults().dir, stank.phpFile( types[i] ) ), 'UTF-8' ) );
            }
        });
    });
});
