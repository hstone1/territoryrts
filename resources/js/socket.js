const ws = new WebSocket("ws://localhost:4567/socket");

let initialized = false;
let global = {};

const merge = function(global, update){
    Object.keys(update).forEach(function(k){
        if (update[k] === "end") {
            while(global.length > k){
                global.pop();
            }
        } else if (typeof (global[k]) === 'undefined') {
            global[k] = update[k];
        } else if (Object.keys(update[k]).length === 0) {
            global[k] = update[k];
        } else if (typeof(update[k]) === 'string') {
            global[k] = update[k];
        } else {
            merge(global[k], update[k]);
        }
    })
};

ws.onopen = function (event) {};

ws.onmessage = function (data) {
    //console.log(data.data)
    if (data.data.startsWith("init")) {
        global = JSON.parse(data.data.substring(4));
        initialized = true;
    } else if (initialized === true ){
        merge(global, JSON.parse(data.data));
        console.log(JSON.stringify(global));
    }
};