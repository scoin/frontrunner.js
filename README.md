FrontRunner.js
=================

FrontRunner is a lightweight wrapper on [HTML5 Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) that implements a switching system and a number of other features.

Using FrontRunner lets you send and receive specific messages between a Worker and your script using familiar jQuery style syntax.

FrontRunner also lets you spawn a worker by simply passing it a function, allowing you to write multi-threaded, client-side Javascript all in the same script.

##Usage

Include FrontRunner.js in your main HTML file, like you would any other client-side Javascript library.

```html
        <script src="/FrontRunner.js"></script>
```

####Basic Usage

_myscript.js_

```javascript
        //create a new worker pointing at your worker file
        var fr = FrontRunner("myworker.js"); 

        //send a "foo" message to the worker
        fr.send("foo", {"bar": "baz"}); 

        //listen for "qux" messages from worker
        fr.on("qux", function(data){
            doSomething(data);
        })
```

_myworker.js_

```javascript

        //you must import FrontRunner to use it in a seperate worker file
        importScripts('FrontRunner.js'); 

        //create a Worker instance of FrontRunner
        var worker = FrontRunner();

        //listen for "foo" messages from script
        worker.on("foo", function(data){
            doSomething(data);
            //send a "qux" message to your script
            worker.send("qux", data);
        })
```

####Passing a Function

You can pass a function to FrontRunner instead of a script location. The contents of that function will be used to create the Worker, allowing you to have your code for both threads in the same script.

You do not need to import FrontRunner on the worker side when you instantiate FrontRunner this way. It is made available for you.

```javascript

        //create a new worker with a function

        var fr = FrontRunner(function(){

            //create a worker instance of FrontRunner inside your function
            var worker = FrontRunner();

            worker.on("foo", function(data){
                doSomething(data);
                worker.send("bar", data);
            })

        })

        fr.send("foo", something);

        fr.on("bar", function(data){
            doSomething(data);
        })
```

####All Methods

######FrontRunner.send(__event__, __data__)

__event__ : string  
__data__: can be any datatype, including blobs

Sends a message between the Worker and the Script,containing data for listeners listening for that event.


######FrontRunner.on(__event__, __callback__)

__event__ : string  
__callback__: function(__data__)

Listens for specific message events sent between the Worker and the Script.

######FrontRunner.remove(__event__)

__event__ : string

Stop listening for that event.

######FrontRunner.terminate()

Kill the worker thread. Can be called from the Script or the Worker.

##TODO

Support SharedWorkers and ServiceWorkers

Test Suite Makefile

More Tests

Register with Bower


##Test
The test suite is a simple express app running mocha and selenium. 

To run the tests, cd into the test directory.

        npm install
        java -jar selenium-server-standalone-2.46.0.jar
        npm start
        npm test


