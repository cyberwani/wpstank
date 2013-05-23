
var WPStank = require('../')
    , stank = new WPStank
    , fs = require('fs')
    , should = require('should');

process.chdir( __dirname );

describe("Initializer", function(){
    // remove any files
    before(function(){
        stank.file.rm( '.wpstank' )
    });

    it("Is empty before a test", function(){
        fs.existsSync( '.wpstank' ).should.eql( false );
    });

    it("Creates a preference file", function(){
        stank.init();
        fs.existsSync( '.wpstank' ).should.eql( true );
    });
});

describe("File System", function(){
    it("Can add a file", function(){
        (1).should.equal(1);
    });
});

describe("Templates", function(){
    describe("default settings", function(){
        it("includes a custom post type", function(){
            (typeof stank.template.postType).should.eql("string")
            stank.template.postType.should.not.have.lengthOf(0)
        });
        it("includes a taxonomy", function(){
            (typeof stank.template.taxonomy).should.eql("string")
            stank.template.taxonomy.should.not.have.lengthOf(0)
        });
    });
});
