class Storage {

    static clearNodeSession(eventUid, eventNodeUid) {
        let key = Storage.makeNodeSessionKey(eventUid, eventNodeUid);

        window.localStorage.removeItem(key);
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

    static getSubmitterName() {
        let submitterName = window.localStorage.getItem("submitter_name");

        return submitterName === null ? "" : submitterName;
    }

    static makeNodeSessionKey(eventUid, eventNodeUid) {
        return "event_" + eventUid + "_node_" + eventNodeUid;
    }

    static queueSubmission(submission) {
        let submissionsRaw = window.localStorage.getItem("submissions"),
            submissions = submissionsRaw === null ? [] : JSON.parse(submissionsRaw);

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
}

export default Storage;