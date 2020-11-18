import {ADD_TODO, SET_COLOR, TOGGLE_TODO, SET_TEXT} from "../actions/actionTypes.js";


const initialState = {
    todos: [],
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
                        completed: false
                    }
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
        default:
            return state
    }
}
export {todosReducer}
