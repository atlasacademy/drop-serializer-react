import React from "react";
import {Provider} from "react-redux";
import {applyMiddleware} from "redux";
import {createStore} from "redux-dynamic-modules-core";
import {DynamicModuleLoader} from "redux-dynamic-modules-react";
import thunkMiddleware from 'redux-thunk';
import DropSerializer from "./components/DropSerializer";
import getDropSerializerModule from "./redux/drop-serializer-module";
import "./sass/app.scss";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.store = createStore(
            {},
            [
                applyMiddleware(thunkMiddleware)
            ]
        );
    }

    render() {
        return <div id={"app"}>
            <Provider store={this.store}>
                <DynamicModuleLoader modules={[getDropSerializerModule()]}>
                    <DropSerializer options={{
                        domain: "https://submissions.atlasacademy.io",
                        enableEventSelector: true
                    }}/>
                </DynamicModuleLoader>
            </Provider>
        </div>;
    }
}

export default App;
