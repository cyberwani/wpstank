
var WPStank = require('../')
    , stank = new WPStank
    , fs = require('fs')
    , should = require('should');

process.chdir( __dirname );

describe("Initializer", function(){
    // remove any files
    before(function(){
        stank.file.rm( '.wpstankrc' )
        stank.file.rm( '.wpstank' )
    });

    it("Is empty before a test", function(){
        fs.existsSync( '.wpstankrc' ).should.eql( false );
    });

    it("Creates a preference file", function(){
        stank.init();
        fs.existsSync( '.wpstankrc' ).should.eql( true );
    });

    it("Creates a preference directory", function(){
        stank.init();
        fs.existsSync( '.wpstank' ).should.eql( true );
    });

    it("Directory preference files are templates", function(){
        stank.init();
        for( template in stank.template ) {
            file = fs.readFileSync( '.wpstank/' + template, 'UTF-8' );
            file.should.eql( stank.template[template] );
        }
    });
});

describe("File System", function(){
    it("Can add a file", function(){
        (1).should.equal(1);
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
            stank.get( 'postType' ).should.eql( fs.readFileSync( '.wpstank/postType', 'UTF-8' ) );
        });
    });
});
