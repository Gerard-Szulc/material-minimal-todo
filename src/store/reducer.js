// Use the initialState as a default value
import { combineReducers } from "redux";
import { todosReducer } from "./reducers/todos.js";
import { filtersReducer } from "./reducers/filters.js";
import {menuReducer} from "./reducers/menu.js";
import {serviceWorkerReducer} from "./reducers/serviceWorkerReducer.js";

const rootReducer = combineReducers({
    todos: todosReducer,
    filters: filtersReducer,
    menu: menuReducer,
    serviceWorkerReducer: serviceWorkerReducer
})
export default rootReducer
