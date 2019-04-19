class Query {

    static get(param) {
        return Query.urlParams().has(param) ? Query.urlParams().get(param) : "";
    }

    static getEvent() {
        return Query.get("event");
    }

    static getNode() {
        return Query.get("node");
    }

    static setEvent(uid) {
        let params = Query.urlParams();

        if (uid)
            params.set("event", uid);
        else
            params.delete("event");

        params.delete("node");
        Query.update("?" + params.toString());
    }

    static setNode(uid) {
        let params = Query.urlParams();

        if (uid)
            params.set("node", uid);
        else
            params.delete("node");

        Query.update("?" + params.toString());
    }

    static update(query) {
        let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + query;
        window.history.replaceState({path: newurl}, '', newurl);
    }

    static urlParams() {
        return new URLSearchParams(window.location.search);
    }

}

export default Query;