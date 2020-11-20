import {
    ADD_TODO,
    SET_COLOR,
    TOGGLE_TODO,
    SET_TEXT,
    TODO_FETCH_SUCCEEDED,
    TODO_FETCH_FAILED, SET_TODOS
} from "../actions/actionTypes.js";

const FETCH_COMPLETED = "FETCH_COMPLETED"
const FETCH_PENDING = "FETCH_PENDING"
const FETCH_ERROR = "FETCH_ERROR"

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
        case TODO_FETCH_SUCCEEDED: {
            return {
                ...state,
                fetchStatus: FETCH_COMPLETED
            }
        }
        case TODO_FETCH_FAILED: {
            return {
                ...state,
                fetchStatus: FETCH_ERROR
            }
        }
        default:
            return state
    }
}
export {todosReducer}
