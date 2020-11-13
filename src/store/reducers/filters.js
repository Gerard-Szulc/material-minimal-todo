import { SET_FILTER } from "../actions/actionTypes.js";


const initialState = {
    filters: {
        status: 'All',
        colors: []
    }
}

// Use the initialState as a default value
const filtersReducer = (state = initialState, action) => {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        case SET_FILTER: {
            return {
                // Copy the whole state
                ...state,
                // Overwrite the filters value
                filters: {
                    // copy the other filter fields
                    ...state.filters,
                    // And replace the status field with the new value
                    status: action.payload
                }
            }
        }


        // Do something here based on the different types of actions
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}
export {filtersReducer}
