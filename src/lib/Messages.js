let listener;

class Messages {

    static push(type, message) {
        listener(type, message);
    }

    static registerListener(callback) {
        listener = callback;
    }

}

export default Messages;