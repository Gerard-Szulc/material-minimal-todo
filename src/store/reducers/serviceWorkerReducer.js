import {SW_INIT, SW_UPDATE} from "../actions/actionTypes.js";

const initialState = {
    serviceWorkerInitialized: false,
    serviceWorkerUpdated: false,
    serviceWorkerRegistration: null,
}

const serviceWorkerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SW_UPDATE: {
            return {
                ...state,
                serviceWorkerUpdated: action.payload,
                serviceWorkerRegistration: action.payload,
            }
        }
        case SW_INIT: {
            return {
                ...state,
                serviceWorkerInitialized: true
            }
        }
        default:
            return state
    }
}
export {serviceWorkerReducer}
