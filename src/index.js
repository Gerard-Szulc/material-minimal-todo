import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import configureStore from "./store/configureStore.js";
import mySaga from "./sagas/saga.js";
import 'leaflet/dist/leaflet.css';
import {startFirebase} from "./firebase/init.js";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
serviceWorkerRegistration.register();

const store = configureStore()
store.runSaga(mySaga)
startFirebase()

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
