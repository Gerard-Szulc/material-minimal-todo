import { ADD_TODO, TOGGLE_TODO, SET_FILTER, SET_COLOR } from "./actionTypes";



export const addTodo = ({text, color}) => ({
    type: ADD_TODO,
    payload: {text, color}
});

export const toggleTodo = id => ({
    type: TOGGLE_TODO,
    payload: { id }
});
export const changeColor = ({id, color}) => ({
    type: SET_COLOR,
    payload: { id, color }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
