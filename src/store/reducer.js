// Use the initialState as a default value
import { combineReducers } from "redux";
import { todosReducer } from "./reducers/todos.js";
import { filtersReducer } from "./reducers/filters.js";
import {menuReducer} from "./reducers/menu.js";

const rootReducer = combineReducers({
    todos: todosReducer,
    filters: filtersReducer,
    menu: menuReducer
})
export default rootReducer
