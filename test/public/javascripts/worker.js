importScripts('/javascripts/FrontRunner.js');

var fr = FrontRunner();

fr.on("test1", function(data){
    fr.send("first", "success")
})
.on("test2", function(data){
    fr.send("second", "failure")
})
.on("test3", function(data){
    fr.send("third", "failure")
})
.on("test3.5", function(data){
    fr.send("3.5", "failure")
})