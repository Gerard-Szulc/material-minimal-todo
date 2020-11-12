// Use the initialState as a default value
import { combineReducers } from "redux";
import { todosReducer } from "./reducers/todos.js";
import { filtersReducer } from "./reducers/filters.js";

const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    todos: todosReducer,
    filters: filtersReducer,
})
export default rootReducer
