import createSagaMiddleware from 'redux-saga'
import reducer from './reducer.js'
import {applyMiddleware, createStore} from "redux";

export default function configureStore(initialState) {
    // Note: passing middleware as the last argument to createStore requires redux@>=3.1.0
    const sagaMiddleware = createSagaMiddleware()
    return {
        ...createStore(reducer, initialState, applyMiddleware(sagaMiddleware)),
        runSaga: sagaMiddleware.run
    }
}
