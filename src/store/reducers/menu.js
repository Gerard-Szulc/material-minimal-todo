import {TOGGLE_MENU} from "../actions/actionTypes.js";


const initialState = {
    mobileOpened: false
}


const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MENU: {
            return {
                ...state,
                mobileOpened: !state.mobileOpened
            }
        }
        default:
            return state
    }
}
export {menuReducer}
