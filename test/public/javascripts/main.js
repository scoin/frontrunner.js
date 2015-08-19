window.onload = function(){
    var fr = FrontRunner('javascripts/worker.js');
    fr.send("test1", "test1")
    .on("first", function(data){
        var test = document.getElementById("test1");
        test.innerHTML = data;
    })
    .send("test2", "test2")
    .on("second", function(data){
        var test = document.getElementById("test2");
        test.innerHTML = data;
    })
    .remove("second")
    .send("test3", "test3")
    .on("third", function(){
        fr.terminate();
        fr.send("test3.5", "test3.5");
    })
    .on("3.5", function(data){
        var test = document.getElementById("test3");
        test.innerHTML = data;
    })
    var fr2 = FrontRunner(function(){
        var br2 = FrontRunner();
        br2.on("test4", function(data){
            console.log("HEREEERE")
            br2.send("fourth", "success")
        })
        .on("test5", function(data){
            br2.send("fifth", "failure")
        })
        .on("test6", function(data){
            br2.send("sixth", "failure")
        })
        .on("test6.5", function(data){
            br2.send("6.5", "failure")
        })
    });

    fr2.send("test4", "test4")
    .on("fourth", function(data){
        var test = document.getElementById("test4");
        test.innerHTML = data;
    })
    .send("test5", "test5")
    .on("fifth", function(data){
        var test = document.getElementById("test5");
        test.innerHTML = data;
    })
    .remove("fifth")
    .send("test6", "test6")
    .on("sixth", function(){
        fr2.terminate();
        fr2.send("test6.5", "test6.5");
    })
    .on("6.5", function(data){
        var test = document.getElementById("test6");
        test.innerHTML = data;
    })
}