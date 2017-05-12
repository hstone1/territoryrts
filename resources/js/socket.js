class Socket {
    constructor() {
        this.sock = new WebSocket("ws://localhost:4567/socket");
        this.listeners = [];

        this.sock.onmessage = (event) => {
            const str = event.data;
            const semi = str.indexOf(':');
            const type = str.substring(0, semi);
            console.log("\n\nRecieved message of type " + type);

            if (this.listeners[type]) {
                if (str.length > semi + 1) {
                    const message = str.substring(semi + 1);
                    try {
                        console.log(JSON.parse(message));
                    } catch (e) {
                        console.log(message);
                    }
                    this.listeners[type].forEach((func) => func(message));
                } else {
                    this.listeners[type].forEach((func) => func());
                }
            }
        }
    }

    addListener(name, func) {
        if (!this.listeners[name]) {
            this.listeners[name] = [func];
        } else {
            this.listeners[name].push(func);
        }
    }

    send(type, message) {
        console.log("\n\n\n\nSENDING " + type + ". Message: " + message
            + ". Endpoint: " + this.endpoint);
        this.sock.send(type + ":" + message);
    }

}

