import {
    INIT_STATE,
    LOAD_SESSION,
    LOAD_SETTINGS,
    LOAD_SUBMISSION_QUEUE,
    PUSH_MESSAGE,
    QUEUE_SUBMISSION,
    RESET_SUBMISSION,
    SELECT_EVENT,
    SELECT_NODE,
    SET_EVENT_DATA,
    SET_EVENT_LIST,
    SET_SHOW_FILTERS,
    SET_SHOW_SETTINGS,
    SET_SHOW_UPLOAD,
    SET_SUBMISSION_PENDING,
    SHIFT_MESSAGES,
    SHIFT_SUBMISSIONS,
    UPDATE_DROP,
    UPDATE_LOADING,
    UPDATE_SETTING
} from "./drop-serializer-actions";

export default function dropSerializerReducer(state, action) {
    switch (action.type) {
        case INIT_STATE:
            return {...state, ...action.payload};
        case LOAD_SESSION: {
            let {selectedEvent, selectedNode} = state,
                storageKey = '' + selectedEvent + '_' + selectedNode,
                json = window.localStorage.getItem(storageKey),
                submissionDrops = json === null ? [] : JSON.parse(json);

            if (!selectedEvent || !selectedNode)
                submissionDrops = [];

            return {...state, submissionDrops};
        }
        case LOAD_SETTINGS: {
            let defaultSettings = {
                    submitter_name: "",
                    click: true,
                    columns: "columns_auto",
                    vibrate: true,
                    width: "width_full",
                    theme: "theme_default",
                },
                json = window.localStorage.getItem('settings'),
                storedSettings = json === null ? [] : JSON.parse(json),
                settings = {...defaultSettings, ...storedSettings};

            return {...state, settings};
        }
        case LOAD_SUBMISSION_QUEUE: {
            let json = window.localStorage.getItem("submissions"),
                submissionQueue = json === null ? [] : JSON.parse(json);

            return {...state, submissionQueue};
        }
        case QUEUE_SUBMISSION: {
            let submission = action.payload,
                {submissionQueue} = state;

            submissionQueue.push(submission);

            window.localStorage.setItem("submissions", JSON.stringify(submissionQueue));

            return {...state, submissionQueue};
        }
        case PUSH_MESSAGE: {
            let messageKey = state.messageKey,
                oldMessages = state.messages,
                message = {...action.payload, key: messageKey++},
                messages = [...oldMessages, message];

            return {...state, messageKey, messages};
        }
        case RESET_SUBMISSION: {
            let {selectedEvent, selectedNode} = state,
                storageKey = '' + selectedEvent + '_' + selectedNode,
                drops = state.eventData.drops,
                submissionDrops = state.submissionDrops.map(submissionDrop => {
                    let drop = drops.filter(drop => drop.uid === submissionDrop.uid).shift();

                    if (drop && drop.type === "Bonus Rate-Up")
                        return submissionDrop;

                    return {...submissionDrop, count: 0};
                });

            window.localStorage.setItem(storageKey, JSON.stringify(submissionDrops));

            return {
                ...state,
                selectedDropUid: null,
                selectedDropQuantity: null,
                selectedDropInitialCount: null,
                submissionDrops
            };
        }
        case SELECT_EVENT:
            return {...state, selectedEvent: action.payload, selectedNode: ""};
        case SELECT_NODE:
            return {...state, selectedNode: action.payload};
        case SET_EVENT_LIST:
            return {...state, eventList: action.payload};
        case SET_EVENT_DATA:
            return {...state, eventData: action.payload};
        case SET_SHOW_FILTERS:
            return {...state, showFilters: action.payload};
        case SET_SHOW_SETTINGS:
            return {...state, showSettings: action.payload};
        case SET_SHOW_UPLOAD:
            return {...state, showUpload: action.payload};
        case SET_SUBMISSION_PENDING:
            return {...state, submissionPending: action.payload};
        case SHIFT_MESSAGES: {
            let messages = state.messages.slice(1);

            return {...state, messages};
        }
        case SHIFT_SUBMISSIONS: {
            let submissionQueue = state.submissionQueue.slice(1);

            window.localStorage.setItem("submissions", JSON.stringify(submissionQueue));

            return {...state, submissionQueue};
        }
        case UPDATE_DROP: {
            let {selectedEvent, selectedNode} = state,
                {uid, quantity, count, ignored} = action.payload,
                storageKey = '' + selectedEvent + '_' + selectedNode,
                nodeDrops = state.eventData.node_drops.filter(nodeDrop => nodeDrop.event_node_uid === selectedNode),
                initialDrop = state.submissionDrops.filter(submissionDrop =>
                    submissionDrop.uid === uid
                    && submissionDrop.quantity === quantity
                ).shift(),
                submissionDrops = nodeDrops.map(nodeDrop => {
                    let submissionDrop = state.submissionDrops.filter(submissionDrop =>
                        submissionDrop.uid === nodeDrop.uid
                        && submissionDrop.quantity === nodeDrop.quantity
                    ).shift();

                    if (submissionDrop === undefined)
                        submissionDrop = {
                            uid: nodeDrop.uid,
                            quantity: nodeDrop.quantity,
                            count: 0,
                            ignored: false
                        };

                    if (submissionDrop.uid === uid && submissionDrop.quantity === quantity)
                        submissionDrop = {
                            ...submissionDrop,
                            count,
                            ignored
                        };

                    return submissionDrop;
                }),
                newState = {...state, submissionDrops};

            window.localStorage.setItem(storageKey, JSON.stringify(submissionDrops));

            if (state.selectedDropUid !== uid || state.selectedDropQuantity !== quantity) {
                newState.selectedDropUid = uid;
                newState.selectedDropQuantity = quantity;
                newState.selectedDropInitialCount = initialDrop ? initialDrop.count : 0;
            }

            return newState;
        }
        case UPDATE_LOADING:
            return {...state, isLoading: action.payload};
        case UPDATE_SETTING: {
            let newState = {...state},
                newSettings = {...newState.settings};

            newSettings[action.payload.property] = action.payload.value;
            newState.settings = newSettings;
            window.localStorage.setItem("settings", JSON.stringify(newSettings));

            return newState;
        }
        default: {
            if (state === undefined)
                return {
                    settings: {}
                };

            return state;
        }
    }
}
