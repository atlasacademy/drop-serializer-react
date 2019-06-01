import dropSerializerReducer from './drop-serializer-reducer';

export default function getDropSerializerModule() {
    return {
        // Unique id of the module
        id: "drop-serializer",
        // Maps the Store key to the reducer
        reducerMap: {
            dropSerializer: dropSerializerReducer,
        }
    };
}