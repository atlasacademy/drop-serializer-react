export const INIT_STATE = "drop-serializer/INIT_STATE";
export const initState = (payload) => {
    return {
        type: INIT_STATE,
        payload
    };
};

export const LOAD_SESSION = "drop-serializer/LOAD_SESSION";
export const loadSession = () => {
    return {
        type: LOAD_SESSION
    };
};

export const LOAD_SETTINGS = "drop-serializer/LOAD_SETTINGS";
export const loadSettings = () => {
    return {
        type: LOAD_SETTINGS
    };
};

export const LOAD_SUBMISSION_QUEUE = "drop-serializer/LOAD_SUBMISSION_QUEUE";
export const loadSubmissionQueue = () => {
    return {
        type: LOAD_SUBMISSION_QUEUE
    };
};

export const QUEUE_SUBMISSION = "drop-serializer/QUEUE_SUBMISSION";
export const queueSubmission = (payload) => {
    return {
        type: QUEUE_SUBMISSION,
        payload
    };
};

export const PUSH_MESSAGE = "drop-serializer/PUSH_MESSAGE";
export const pushMessage = (type, message) => {
    return {
        type: PUSH_MESSAGE,
        payload: {type, message}
    };
};

export const RESET_SUBMISSION = "drop-serializer/RESET_SUBMISSION";
export const resetSubmission = () => {
    return {
        type: RESET_SUBMISSION
    };
};

export const SELECT_EVENT = "drop-serializer/SELECT_EVENT";
export const setEvent = (payload) => {
    return {
        type: SELECT_EVENT,
        payload
    };
};

export const SELECT_NODE = "drop-serializer/SELECT_NODE";
export const setNode = (payload) => {
    return {
        type: SELECT_NODE,
        payload
    };
};

export const SET_EVENT_LIST = "drop-serializer/SET_EVENT_LIST";
export const setEventList = (payload) => {
    return {
        type: SET_EVENT_LIST,
        payload
    };
};

export const SET_EVENT_DATA = "drop-serializer/SET_EVENT_DATA";
export const setEventData = (payload) => {
    return {
        type: SET_EVENT_DATA,
        payload
    };
};

export const SET_SHOW_FILTERS = "drop-serializer/SET_SHOW_FILTERS";
export const setShowFilters = (payload) => {
    return {
        type: SET_SHOW_FILTERS,
        payload
    };
};

export const SET_SHOW_SETTINGS = "drop-serializer/SET_SHOW_SETTINGS";
export const setShowSettings = (payload) => {
    return {
        type: SET_SHOW_SETTINGS,
        payload
    };
};

export const SET_SUBMISSION_PENDING = "drop-serializer/SET_SUBMISSION_PENDING";
export const setSubmissionPending = (payload) => {
    return {
        type: SET_SUBMISSION_PENDING,
        payload
    };
};

export const SHIFT_MESSAGES = "drop-serializer/SHIFT_MESSAGES";
export const shiftMessages = () => {
    return {
        type: SHIFT_MESSAGES
    };
};

export const SHIFT_SUBMISSIONS = "drop-serializer/SHIFT_SUBMISSIONS";
export const shiftSubmissions = () => {
    return {
        type: SHIFT_SUBMISSIONS
    };
};

export const UPDATE_DROP = "drop-serializer/UPDATE_DROP";
export const updateDrop = (uid, quantity, count, ignored) => {
    return {
        type: UPDATE_DROP,
        payload: {uid, quantity, count, ignored}
    };
};

export const UPDATE_LOADING = "drop-serializer/UPDATE_LOADING";
export const updateLoading = (payload) => {
    return {
        type: UPDATE_LOADING,
        payload
    };
};

export const UPDATE_SETTING = "drop-serializer/UPDATE_SETTING";
export const updateSetting = (property, value) => {
    return {
        type: UPDATE_SETTING,
        payload: {property, value}
    };
};
