class Storage {

    static clearNodeSession(eventUid, eventNodeUid) {
        let key = Storage.makeNodeSessionKey(eventUid, eventNodeUid);

        window.localStorage.removeItem(key);
    }

    static getNextSubmission() {
        let submissions = Storage.getSubmissions();

        if (submissions.length === 0)
            return null;

        return submissions.shift();
    }

    static getNodeSession(eventUid, eventNodeUid) {
        let key = Storage.makeNodeSessionKey(eventUid, eventNodeUid),
            nodeSession = window.localStorage.getItem(key);

        if (nodeSession === null)
            return [];

        return JSON.parse(nodeSession);
    }

    static getSessionNodeDrop(eventUid, eventNodeUid, dropUid, dropQuantity) {
        let nodeSession = Storage.getNodeSession(eventUid, eventNodeUid),
            defaultNodeDrop = {
                uid: dropUid,
                quantity: dropQuantity,
                count: 0,
                ignored: false
            };

        let nodeDrop = nodeSession.filter(nodeDrop => {
            return nodeDrop.uid === dropUid
                && nodeDrop.quantity === dropQuantity;
        }).shift();

        if (nodeDrop === undefined)
            return defaultNodeDrop;

        return nodeDrop;
    }

    static getSubmissions() {
        let submissionsRaw = window.localStorage.getItem("submissions");

        return submissionsRaw === null ? [] : JSON.parse(submissionsRaw);
    }

    static getSubmitterName() {
        let submitterName = window.localStorage.getItem("submitter_name");

        return submitterName === null ? "" : submitterName;
    }

    static makeNodeSessionKey(eventUid, eventNodeUid) {
        return "event_" + eventUid + "_node_" + eventNodeUid;
    }

    static queueSubmission(submission) {
        let submissions = Storage.getSubmissions();

        submissions.push(submission);

        window.localStorage.setItem("submissions", JSON.stringify(submissions));
    }

    static setSessionNodeDrop(eventUid, eventNodeUid, dropUid, dropQuantity, count, ignored) {
        let key = Storage.makeNodeSessionKey(eventUid, eventNodeUid),
            nodeSession = Storage.getNodeSession(eventUid, eventNodeUid),
            filteredSession = nodeSession.filter(sessionNodeDrop => {
                return sessionNodeDrop.uid !== dropUid
                    || sessionNodeDrop.quantity !== dropQuantity;
            });

        filteredSession.push({
            uid: dropUid,
            quantity: dropQuantity,
            count: count,
            ignored: ignored
        });

        window.localStorage.setItem(key, JSON.stringify(filteredSession));
    }

    static setSubmitterName(name) {
        window.localStorage.setItem("submitter_name", name);
    }

    static shiftSubmissions() {
        let submissions = Storage.getSubmissions().slice(1);

        window.localStorage.setItem("submissions", JSON.stringify(submissions));
    }

}

export default Storage;