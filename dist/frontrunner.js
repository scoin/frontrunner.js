function FrontRunner(opts){
    var data = {
        listeners: {},
        settings: {},
        worker: null,
        __isWorker: false
    }

    var __input = typeof opts;

    if(__input === "string"){
        data.settings.worker = opts;
    }
    else if(__input === "object"){
        data.settings = opts;
    }
    else if(__input === "function"){
        var fr = FrontRunner.toString();
        var fn = opts.toString();
        var file = new Blob([fr, ";(", fn, ")(FrontRunner());"], {type: 'application/javascript'});
        data.settings.worker = self.URL.createObjectURL(file);
    }

    if(data.settings.worker){
        data.worker = new Worker(data.settings.worker);
    } else {
        data.__isWorker = true;
    }

    var __onMessage = function (event){
        var key = Object.keys(event.data)[0];
        if(data.listeners[key]){
            data.listeners[key](event.data[key])
        }
    }
    
    if(data.__isWorker){
        onmessage = __onMessage;
    }
    else{
        data.worker.onmessage = __onMessage;
    }

   return {
        send : function(eventName, message){
            var newMessage = {};
            newMessage[eventName] = message;
            if(data.__isWorker === true){
                self.postMessage(newMessage);
            } else {
                data.worker.postMessage(newMessage)
            }
            return this;
        },
        on : function(eventName, todo){
            data.listeners[eventName] = todo;
            return this;
        },
        remove : function(eventName){
            if(data.listeners[eventName]){
                data.listeners[eventName] = null;
            }
            return this;
        },
        terminate : function(){
            if(data.__isWorker){
                close();
            }
            else{
                data.worker.terminate();
            }
            return this;
        }
    }
}