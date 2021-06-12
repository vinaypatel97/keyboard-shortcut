import keypress from 'keypress.js';
const listener = new keypress.Listener();

class Listner {
    constructor() {
        this.listener = listener;
    }

    addListner(shortcutStr, desc, cb) {
        return this.listener.simple_combo(shortcutStr, () => cb(desc));
    }

    registerScreenListner(arr) {
        this.listener.register_many(arr)
    }

    reset() {
        this.listener.reset();
    }
}

export default Listner;
