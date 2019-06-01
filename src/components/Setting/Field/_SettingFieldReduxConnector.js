import {connect as reduxConnect} from "react-redux";
import {updateSetting} from "../../../redux/drop-serializer-actions";

function mapStateToProps(state, ownProps) {
    let {property} = ownProps,
        {settings} = state.dropSerializer,
        value = settings[property];

    return {property, value};
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        update: (value) => dispatch(updateSetting(
            ownProps.property,
            value
        ))
    };
}

const connect = reduxConnect(mapStateToProps, mapDispatchToProps);

export default {connect, mapDispatchToProps, mapStateToProps};
