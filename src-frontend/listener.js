export default class Listener {
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

