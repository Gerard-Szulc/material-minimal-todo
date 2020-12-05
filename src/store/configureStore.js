import createSagaMiddleware from 'redux-saga'
import reducer from './reducer.js'
import {applyMiddleware, createStore, compose } from "redux";

export default function configureStore(initialState) {
    // Note: passing middleware as the last argument to createStore requires redux@>=3.1.0
    const sagaMiddleware = createSagaMiddleware()
    const composeEnhancers = process.env.NODE_ENV === 'production' ? compose : (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);

    return {
        ...createStore(reducer, initialState, composeEnhancers(applyMiddleware(sagaMiddleware))),
        runSaga: sagaMiddleware.run
    }
}
