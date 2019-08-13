import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faBan,
    faCheck,
    faCog,
    faCopy,
    faFileExcel,
    faFilter,
    faMinus,
    faSpinner,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import {faDiscord, faGithub} from '@fortawesome/free-brands-svg-icons';

library.add(faBan);
library.add(faCheck);
library.add(faCog);
library.add(faCopy);
library.add(faFileExcel);
library.add(faFilter);
library.add(faMinus);
library.add(faSpinner);
library.add(faTrashAlt);
library.add(faDiscord);
library.add(faGithub);

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
