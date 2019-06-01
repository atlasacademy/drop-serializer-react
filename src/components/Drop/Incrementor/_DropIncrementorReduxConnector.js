import {connect as reduxConnect} from "react-redux";
import _DropReduxConnector from "../_DropReduxConnector";

function mapStateToProps(state, ownProps) {
    const {parent} = ownProps,
        dropState = _DropReduxConnector.mapStateToProps(state, ownProps);

    return {
        ...dropState,
        parent
    };
}

const mapDispatchToProps = _DropReduxConnector.mapDispatchToProps;

const connect = reduxConnect(mapStateToProps, mapDispatchToProps);

export default {connect, mapDispatchToProps, mapStateToProps};
