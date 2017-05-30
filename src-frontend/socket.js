import Listener from './listener';

export default class Socket {
    constructor() {
        this.sock = new WebSocket("ws://localhost:4567/socket");
        this.listener = new Listener((obj) => {
            console.log("No listener registered");
            console.log(obj);
        });

        this.sock.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // console.log("RECIEVED MESSAGE OF TYPE: " + data.type);
            // console.log(data);
            this.listener.doCall(data);
        }
    };

    send(type, message) {
        console.log("\n\n\n\nSENDING " + type + ". Message: " + message
            + ". Endpoint: " + this.endpoint);
        this.sock.send(type + ":" + message);
    }
};

