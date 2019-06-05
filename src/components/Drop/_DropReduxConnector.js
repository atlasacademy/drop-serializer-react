import {connect as reduxConnect} from "react-redux";
import {updateDrop} from "../../redux/drop-serializer-actions";

function mapStateToProps(state, ownProps) {
    let {nodeDrop} = ownProps,
        {
            eventData,
            selectedDropUid,
            selectedDropQuantity,
            selectedDropInitialCount,
            settings,
            showFilters,
            submissionDrops
        } = state.dropSerializer,
        drop = eventData.drops.filter(drop => drop.uid === nodeDrop.uid).shift(),
        quantityDisplay = nodeDrop.quantity > 1 ? nodeDrop.quantity : drop.quantity,
        submissionDrop = submissionDrops.filter(submissionDrop => {
                                            return submissionDrop.uid === nodeDrop.uid
                                                && submissionDrop.quantity === nodeDrop.quantity;
                                        })
                                        .shift();

    if (submissionDrop === undefined)
        submissionDrop = {
            uid: nodeDrop.uid,
            quantity: nodeDrop.quantity,
            count: 0,
            ignored: false
        };

    return {
        drop,
        nodeDrop,
        quantityDisplay,
        selectedDropUid,
        selectedDropQuantity,
        selectedDropInitialCount,
        submissionDrop,
        settings,
        showFilters
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        update: (count, ignored) => dispatch(updateDrop(
            ownProps.nodeDrop.uid,
            ownProps.nodeDrop.quantity,
            count,
            ignored
        ))
    };
}

const connect = reduxConnect(mapStateToProps, mapDispatchToProps);

export default {connect, mapDispatchToProps, mapStateToProps};
