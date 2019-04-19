import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faBan, faCheck, faCog, faCopy, faFilter, faMinus, faSpinner, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

library.add(faBan);
library.add(faCheck);
library.add(faCog);
library.add(faCopy);
library.add(faFilter);
library.add(faMinus);
library.add(faSpinner);
library.add(faTrashAlt);

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
