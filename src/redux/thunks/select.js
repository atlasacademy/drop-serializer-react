import {loadSession, setEvent, setEventData, setNode, updateLoading} from "../drop-serializer-actions";
import {setQuery} from "./query";
import {fetchEvent} from "./load";

export const selectEvent = (uid) => {
    return (dispatch, _) => {
        if (!uid)
            return Promise.resolve()
                          .then(() => dispatch(setEvent(uid)))
                          .then(() => dispatch(setQuery(false, false)))
                          .then(() => dispatch(setEventData(null)));

        return Promise.resolve()
                      .then(() => dispatch(setEvent(uid)))
                      .then(() => dispatch(setQuery(uid, false)))
                      .then(() => dispatch(updateLoading(true)))
                      .then(() => dispatch(setEventData(null)))
                      .then(() => dispatch(fetchEvent()))
                      .then(() => dispatch(updateLoading(false)));
    };
};

export const selectNode = (uid) => {
    return (dispatch, getState) => {
        const {selectedEvent} = getState().dropSerializer;

        return Promise.resolve()
                      .then(() => dispatch(setNode(uid)))
                      .then(() => dispatch(setQuery(selectedEvent, uid)))
                      .then(() => dispatch(loadSession()));
    };
};
