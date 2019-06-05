import axios from "axios";
import {
    initState,
    loadSession, loadSettings, loadSubmissionQueue,
    setEventData, setEventList,
    updateLoading
} from "../drop-serializer-actions";

export const init = (options) => {
    let state = {
        domain: "https://submissions.atlasacademy.io",
        enableEventSelector: true,
        enableQueryParameters: true,
        messageKey: 0,
        messages: [],
        nodeSave: [],
        selectedEvent: "",
        selectedNode: "",
        selectedDropUid: null,
        selectedDropQuantity: null,
        selectedDropInitialCount: null,
        settings: {},
        showFilters: false,
        showSettings: false,
        submissionPending: false,
        submissionQueue: [],
        ...options
    };

    if (state.enableQueryParameters) {
        let params = new URLSearchParams(window.location.search);

        if (!state.selectedEvent)
            state.selectedEvent = params.has("event") ? params.get("event") : "";

        if (state.selectedEvent && !state.selectedNode)
            state.selectedNode = params.has("node") ? params.get("node") : "";
    }

    return (dispatch) => {
        return Promise.resolve()
                      .then(() => dispatch(initState(state)))
                      .then(() => dispatch(updateLoading(true)))
                      .then(() => dispatch(loadSettings()))
                      .then(() => dispatch(fetchEvents()))
                      .then(() => dispatch(fetchEvent()))
                      .then(() => dispatch(loadSession()))
                      .then(() => dispatch(loadSubmissionQueue()))
                      .then(() => dispatch(updateLoading(false)));
    };
};

export const fetchEvents = () => {
    return (dispatch, getState) => {
        const {domain, enableEventSelector} = getState().dropSerializer;

        if (!enableEventSelector)
            return;

        return axios.get(domain + "/event")
            .then(response => dispatch(setEventList(response.data)));
    };
};

export const fetchEvent = () => {
    return (dispatch, getState) => {
        const {domain, selectedEvent} = getState().dropSerializer;

        if (!selectedEvent)
            return;

        return axios.get(domain + "/event/" + selectedEvent)
            .then(response => dispatch(setEventData(response.data)));
    };
};
