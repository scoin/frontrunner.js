var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'firefox' } };
var client = webdriverio.remote(options);
var expect = require('chai').expect;

describe("Test FrontRunner", function(){

    before(function(done){
        c = client.init(function(){
            c.url("http://localhost:3000");
            done()
        });
    })

    after(function(done){
        c.end()
        done()
    })

    describe("Test Frontrunner called with worker file", function(){

        it("should send and receive messages with a specific key", function(done){
            c.getText("#test1")
            .then(function(text){
                expect(text).to.eql("success")
                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        it("should remove listeners and no longer trigger the callback on messages", function(done){
            c.getText("#test2")
            .then(function(text){
                expect(text).to.eql("success")
                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        it("should terminate and no further messages sent or received", function(done){
            c.getText("#test3")
            .then(function(text){
                expect(text).to.eql("success")
                done()
            })
            .catch(function(err){
                done(err)
            })
        })
    })

    describe("Test FrontRunner called with function as worker", function(){
        it("should send and receive messages with a specific key", function(done){
            c.getText("#test4")
            .then(function(text){
                expect(text).to.eql("success")
                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        it("should remove listeners and no longer trigger the callback on messages", function(done){
            c.getText("#test5")
            .then(function(text){
                expect(text).to.eql("success")
                done()
            })
            .catch(function(err){
                done(err)
            })
        })
        it("should terminate and no further messages sent or received", function(done){
            c.getText("#test6")
            .then(function(text){
                expect(text).to.eql("success")
                c.end()
                done()
            })
            .catch(function(err){
                done(err)
            })
        })
    })
})


