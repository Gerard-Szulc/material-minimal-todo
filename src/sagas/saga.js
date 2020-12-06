import { call, put, takeLatest, select  } from 'redux-saga/effects'
import {
    SAVE_TODOS,
    SET_TODO_FETCH_FAILED,
    SET_TODO_FETCH_REQUESTED,
    SET_TODO_FETCH_SUCCEEDED,
    SET_TODOS
} from "../store/actions/actionTypes.js";

const getLocalStorageData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = window.localStorage.getItem('todos')
            data ? resolve(JSON.parse(data)) : reject([])
        },2000)
    })
}
const setLocalStorageData = (todos) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const stringified = JSON.stringify(todos)
            window.localStorage.setItem('todos', stringified)
            resolve(stringified)
        },2000)
    })
}

function* fetchTodos() {
    try {
        const data = yield call(getLocalStorageData);
        yield put({type: SET_TODO_FETCH_SUCCEEDED, data});
        yield put({type: SET_TODOS, todos: data});
    } catch (e) {
        yield put({type: SET_TODO_FETCH_FAILED, message: e.message});
    }
}
function* saveTodos() {
    try {
        const todos = yield select(state => state.todos.todos)
        const data = yield call(setLocalStorageData, todos);
        yield put({type: "SET_TODO_SAVE_SUCCEEDED", data});
    } catch (e) {
        yield console.error("Saving crashed", e)
    }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
    yield takeLatest(SET_TODO_FETCH_REQUESTED, fetchTodos);
    yield takeLatest(SAVE_TODOS, saveTodos);
}

export default mySaga;
