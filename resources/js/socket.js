class Socket {
    constructor() {
        this.sock = new WebSocket("ws://localhost:4567/socket");
        this.listener = new Listener((obj) => {
            console.log("No listener registered");
            console.log(obj);
        });

        this.sock.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            this.listener.doCall(data);
        }
    };

    send(type, message) {
        console.log("\n\n\n\nSENDING " + type + ". Message: " + message
            + ". Endpoint: " + this.endpoint);
        this.sock.send(type + ":" + message);
    }
}

class Listener{
    constructor(fun){
        this.fun = fun;
        this.listeners = {};
    }

    addListener(name, fun){
        this.listeners[name] = new Listener(fun);
        return this.listeners[name];
    }

    doCall(m) {
        if ("type" in m && m.type in this.listeners) {
            this.listeners[m.type].doCall(m.message);
        } else {
            this.fun(m);
        }
    }
}

