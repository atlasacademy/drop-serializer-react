export const setQuery = (eventUid, nodeUid) => {
    return (dispatch, getState) => {
        const {enableQueryParameters} = getState().dropSerializer;

        if (!enableQueryParameters)
            return;

        let location = window.location,
            params = new URLSearchParams(location.search);

        if (eventUid) params.set("event", eventUid);
        else params.delete("event");

        if (nodeUid) params.set("node", nodeUid);
        else params.delete("node");

        let hostname = location.protocol + "//" + location.host + location.pathname,
            newUrl = hostname + "?" + params.toString();

        window.history.replaceState({path: newUrl}, '', newUrl);
    };
};