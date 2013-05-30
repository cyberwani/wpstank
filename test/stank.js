
var WPStank = require('../')
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
    stank.file.rm( stank.settings().rc )
    stank.file.rm( stank.settings().dir )
};

// change into the testing dir
process.chdir( __dirname );

// Tests
describe("Initializer", function(){
    describe("Before init", function(){
        it("Is empty before a test", function(){
            fs.existsSync( stank.settings().rc ).should.eql( false );
        });
    });

    describe("After init", function(){
        // remove any files
        beforeEach( cleanInit );
        after( clean );

        it("Creates a preference file", function(){
            fs.existsSync( stank.settings().rc ).should.eql( true );
        });

        it("Creates a preference directory", function(){
            fs.existsSync( stank.settings().rc ).should.eql( true );
        });

        it("Directory preference files are templates", function(){
            for( template in stank.template ) {
                file = fs.readFileSync( path.join( stank.settings().dir, stank.phpFile(template) ), 'UTF-8' );
                file.should.eql( stank.template[template] );
            }
        });
    });
});

describe("Settings", function(){
    beforeEach( cleanInit );

    it("Can modify settings", function(){
        var settings = JSON.parse( fs.readFileSync( stank.settings().rc, 'UTF-8' ) )
            , dir = path.join( 'library', 'special-post-type-dir' ) ;
        settings.types.postType = dir ;
        fs.writeFileSync( settings.rc, JSON.stringify( settings, null, 4 ), 'UTF-8' );
        newSettings = stank.file.read( settings.rc );
        settings.should.eql( JSON.parse( newSettings ) );
    });
    /*
    it("Can change postType dir", function(){
        stank.create( "job", "postType" );
        fs.existsSync( path.join( stank.settings().types.postType, 'job.php' ) ).should.eql( true );
    });
    */
});
describe("File System", function(){
    describe( "Create / Destroy", function(){
        beforeEach( function(){
            stank.create( "job", "postType" );
        });

        it("can create a file", function(){
            fs.existsSync( path.join( stank.settings().types.postType, 'job.php' ) ).should.eql( true );
        });
        it("can destroy a file", function(){
            stank.destroy( "job", "postType" );
            fs.existsSync( path.join( stank.settings().types.postType, 'job.php' ) ).should.eql( false );
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
                stank.get( types[i] ).should.eql( fs.readFileSync( path.join( stank.settings().dir, stank.phpFile( types[i] ) ), 'UTF-8' ) );
            }
        });
    });
});
