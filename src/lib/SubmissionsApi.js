const hostname = "https://submissions.atlasacademy.io";
// const hostname = "http://submissions.test.atlasacademy.io";
const XMLHttpRequest = require("xmlhttprequest-ssl").XMLHttpRequest;

class SubmissionsApi {

    static getEvents(callback) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            let events = JSON.parse(xhr.responseText),
                submittableEvents = events.filter(event => {
                    return event.submittable;
                });

            callback(submittableEvents);
        };
        xhr.open("GET", hostname + "/event");
        xhr.send();
    }

    static getEvent(uid, callback) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            let event = JSON.parse(xhr.responseText);

            if (!event.submittable)
                return;

            callback(event);
        };
        xhr.open("GET", hostname + "/event/" + uid);
        xhr.send();
    }

    static postSubmission(submission, successCallback, failureCallback) {
        let xhr = new XMLHttpRequest(),
            urlEncodedData,
            urlEncodedDataPairs = [];

        urlEncodedDataPairs.push(encodeURIComponent("event_uid") + '=' + encodeURIComponent(submission.event_uid));
        urlEncodedDataPairs.push(encodeURIComponent("event_node_uid") + '=' + encodeURIComponent(submission.event_node_uid));
        urlEncodedDataPairs.push(encodeURIComponent("submitter") + '=' + encodeURIComponent(submission.submitter));
        submission.drops.forEach((drop, key) => {
            for (let field in drop) {
                let value = typeof drop[field] === "boolean" ? Number(drop[field]) : encodeURIComponent(drop[field]);
                urlEncodedDataPairs.push(
                    encodeURIComponent("drops[" + key + "][" + field + "]")
                    + '='
                    + value
                );
            }
        });

        urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

        xhr.onload = function () {
            let result = JSON.parse(xhr.responseText);

            successCallback(result);
        };

        xhr.onerror = function () {
            failureCallback(xhr.status);
        };

        xhr.open("POST", hostname + "/submit/run");
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(urlEncodedData);
    }

}

export default SubmissionsApi;