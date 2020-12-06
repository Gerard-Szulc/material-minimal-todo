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

const isServiceWorkerInitialized = () => createSelector(
    state => state.serviceWorkerReducer,
    serviceWorkerReducer => serviceWorkerReducer.serviceWorkerInitialized
);
const isServiceWorkerUpdated = () => createSelector(
    state => state.serviceWorkerReducer,
    serviceWorkerReducer => serviceWorkerReducer.serviceWorkerUpdated
);
const serviceWorkerRegistration = () => createSelector(
    state => state.serviceWorkerReducer,
    serviceWorkerReducer => serviceWorkerReducer.serviceWorkerRegistration
);


export {
    selectNotDoneTodos,
    mobileOpenSelect,
    selectAllTodos,
    selectFetchStatus,
    isServiceWorkerInitialized,
    isServiceWorkerUpdated,
    serviceWorkerRegistration
}
