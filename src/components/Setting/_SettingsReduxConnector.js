import {connect as reduxConnect} from "react-redux";
import {setShowSettings} from "../../redux/drop-serializer-actions";

function mapStateToProps(state) {
    let {showSettings} = state.dropSerializer;

    return {showSettings};
}

function mapDispatchToProps(dispatch) {
    return {
        hide: () => dispatch(setShowSettings(false)),
        show: () => dispatch(setShowSettings(true)),
        toggle: () => dispatch((dispatch, getState) => {
            let {showSettings} = getState().dropSerializer;

            return dispatch(setShowSettings(!showSettings));
        })
    };
}

const connect = reduxConnect(mapStateToProps, mapDispatchToProps);

const _SettingsReduxConnector = {connect, mapDispatchToProps, mapStateToProps};

export default _SettingsReduxConnector;
