import {
    ADD_TODO,
    SET_COLOR,
    TOGGLE_TODO,
    SET_TEXT, SET_TODOS, SET_TODO_FETCH_REQUESTED, SET_TODO_FETCH_FAILED, SET_TODO_FETCH_SUCCEEDED
} from "../actions/actionTypes.js";
import {FETCH_PENDING, FETCH_ERROR, FETCH_COMPLETED} from "../../utils/fetchTypes.js";


const initialState = {
    todos: [],
    fetchStatus: FETCH_PENDING
}

function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
}

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO: {
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: nextTodoId(state.todos),
                        text: action.payload.text,
                        color: action.payload.color,
                        position: action.payload.position,
                        completed: false
                    }
                ]
            }
        }
        case SET_TODOS: {
            return {
                ...state,
                todos: [
                    ...action.todos
                ]
            }
        }
        case TOGGLE_TODO: {
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id !== action.payload.id) {
                        return todo
                    }

                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                })
            }
        }
        case SET_COLOR: {
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id !== action.payload.id) {
                        return todo
                    }

                    return {
                        ...todo,
                        color: action.payload.color
                    }
                })
            }
        }
        case SET_TEXT: {
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id !== action.payload.id) {
                        return todo
                    }

                    return {
                        ...todo,
                        text: action.payload.text
                    }
                })
            }
        }
        case SET_TODO_FETCH_SUCCEEDED: {
            return {
                ...state,
                fetchStatus: FETCH_COMPLETED
            }
        }
        case SET_TODO_FETCH_FAILED: {
            return {
                ...state,
                fetchStatus: FETCH_ERROR
            }
        }
        case SET_TODO_FETCH_REQUESTED: {
            return {
                ...state,
                fetchStatus: FETCH_PENDING
            }
        }
        default:
            return state
    }
}
export {todosReducer}
