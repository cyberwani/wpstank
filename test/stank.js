
var WPStank = require('../')
    , stank = new WPStank
    , assert = require('assert')
    , should = require('should');

describe("File System", function(){
    it("Can add a file", function(){
        (1).should.equal(1);
    });
});

describe("Templates", function(){
    describe("default settings", function(){
        it("has post type", function(){
            (typeof stank.template.postType).should.eql("string")
            stank.template.postType.should.not.have.lengthOf(0)
        });
        it("has taxonomy", function(){
            (typeof stank.template.taxonomy).should.eql("string")
            stank.template.taxonomy.should.not.have.lengthOf(0)
        });
    });
});
