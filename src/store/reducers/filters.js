import { SET_FILTER } from "../actions/actionTypes.js";


const initialState = {
    filters: {
        status: 'All',
        colors: []
    }
}

const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILTER: {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    status: action.payload
                }
            }
        }

        default:
            return state
    }
}
export {filtersReducer}
