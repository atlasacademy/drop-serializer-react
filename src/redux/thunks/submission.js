import axios from "axios";
import uuidv1 from "uuid/v1";
import {
    pushMessage,
    queueSubmission,
    resetSubmission,
    setSubmissionPending,
    shiftSubmissions
} from "../drop-serializer-actions";
import {selectEvent, selectNode} from "./select";

export const queue = () => {
    return (dispatch, getState) => {
        const {eventData, selectedEvent, selectedNode, settings, submissionDrops} = getState().dropSerializer,
            nodeDrops = eventData.node_drops.filter(nodeDrop => nodeDrop.event_node_uid === selectedNode),
            submitterName = settings ? settings.submitter_name : "";

        // Loop through node drops and fill in any drops missing from submission drops with standard 0 count
        let drops = nodeDrops.map(nodeDrop => {
            let drop = submissionDrops.filter(submissionDrop =>
                submissionDrop.uid === nodeDrop.uid && submissionDrop.quantity === nodeDrop.quantity
            ).shift();

            if (!drop)
                drop = {uid: nodeDrop.uid, quantity: nodeDrop.quantity, count: 0, ignored: false};

            return drop;
        });

        let submission = {
            event_uid: selectedEvent,
            event_node_uid: selectedNode,
            submitter: submitterName,
            drops: drops,
            token: uuidv1()
        };

        return Promise.resolve()
                      .then(() => dispatch(queueSubmission(submission)))
                      .then(() => dispatch(resetSubmission()))
                      .then(() => dispatch(sendNext()));
    };
};

export const sendNext = () => {
    return (dispatch, getState) => {
        const {submissionQueue, submissionPending} = getState().dropSerializer;

        if (submissionPending)
            return;

        if (!submissionQueue.length)
            return;

        let submission = submissionQueue[0];

        return dispatch(submit(submission));
    };
};

export const submit = (submission) => {
    return (dispatch, getState) => {
        const {event_uid} = submission;
        const {domain} = getState().dropSerializer;

        return Promise.resolve()
                      .then(() => dispatch(setSubmissionPending(true)))
                      .then(() => axios.post(domain + '/submit/run', submission))
                      .then((response) =>
                          Promise.resolve()
                                 .then(() => dispatch(pushMessage(
                                     "success",
                                     "Created submission: " + response.data.receipt
                                 )))
                                 .then(() => dispatch(shiftSubmissions()))
                                 .then(() => dispatch(setSubmissionPending(false)))
                                 .then(() => dispatch(reloadOutdatedEventData(event_uid, response.data.missing_drops)))
                                 .then(() => dispatch(sendNext()))
                      )
                      .catch(error => {
                          if (error.response.status === 422) {
                              return Promise.resolve()
                                            .then(() => dispatch(pushMessage(
                                                "danger",
                                                "Submission rejected"
                                            )))
                                            .then(() => dispatch(shiftSubmissions()))
                                            .then(() => dispatch(setSubmissionPending(false)))
                                            .then(() => dispatch(sendNext()));
                          }

                          return Promise.resolve()
                                        .then(() => dispatch(pushMessage(
                                            "warning",
                                            "Issue during submission. Retrying ..."
                                        )))
                                        .then(() => {
                                            return new Promise(resolve => {
                                                window.setTimeout(resolve, 5000);
                                            });
                                        })
                                        .then(() => dispatch(setSubmissionPending(false)))
                                        .then(() => dispatch(sendNext()));
                      });
    };
};

export const reloadOutdatedEventData = (submissionEventUid, missingDrops) => {
    return (dispatch, getState) => {
        const {selectedEvent, selectedNode} = getState().dropSerializer;

        // Event data isn't outdated
        if (!missingDrops) {
            return Promise.resolve();
        }

        // Outdated event isn't the current selected event. They will refresh if they select again so do not force
        // a refresh
        if (submissionEventUid !== selectedEvent) {
            return Promise.resolve();
        }

        // Event data is outdated. Refresh the data
        return Promise.resolve()
                      .then(() => dispatch(pushMessage(
                          "info",
                          "Event data is outdated. Refreshing now ..."
                      )))
                      .then(() => dispatch(selectEvent('')))
                      .then(() => dispatch(selectEvent(selectedEvent)))
                      .then(() => dispatch(selectNode(selectedNode)));
    };
};
