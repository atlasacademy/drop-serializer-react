const hostname = "https://submissions.atlasacademy.io";
const XMLHttpRequest = require("xmlhttprequest-ssl").XMLHttpRequest;

class SubmissionsApi {

    static getEvents(callback) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            callback(JSON.parse(xhr.responseText));
        };
        xhr.open("GET", hostname + "/event");
        xhr.send();
    }

    static getEvent(uid, callback) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            callback(JSON.parse(xhr.responseText));
        };
        xhr.open("GET", hostname + "/event/" + uid);
        xhr.send();
    }

}

export default SubmissionsApi;