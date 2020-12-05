import {createSelector} from "reselect";

const selectNotDoneTodos = (filter) => createSelector(
    state => state.todos.todos,
    todos => todos.filter(todo => filter(todo))
)

const mobileOpenSelect = () => createSelector(
    state => state.menu.mobileOpened,
    mobileOpened => mobileOpened
)

const selectAllTodos = () => createSelector(
    state => state.todos.todos,
    todos => todos
)

const selectFetchStatus = () => createSelector(
    state => state.todos.fetchStatus,
    fectchStatus => fectchStatus
)

export {selectNotDoneTodos, mobileOpenSelect, selectAllTodos, selectFetchStatus}
