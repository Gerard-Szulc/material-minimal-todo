import {todosReducer} from '../todos.js'
import * as types from '../../actions/actionTypes.js'
import {FETCH_COMPLETED, FETCH_ERROR, FETCH_PENDING} from "../../../utils/fetchTypes.js";
import {SET_TODO_FETCH_FAILED, SET_TODO_FETCH_REQUESTED, SET_TODO_FETCH_SUCCEEDED} from "../../actions/actionTypes.js";

describe('todos reducer', () => {
    it('should return the initial state', () => {
        expect(todosReducer(undefined, {})).toEqual({fetchStatus: FETCH_PENDING, todos: []})
    })
    const actionAddTODO = {
        type: types.ADD_TODO,
        payload: {
            text: 'test string 1',
            color: 'test string 2',
            position: 'test string 3'
        }
    }
    const actionSETTODOS = {
        type: types.SET_TODOS,
        todos: [
            {
                text: 'test string 1',
                color: 'test string 2',
                position: 'test string 3',
                completed: false,
                id: 0
            }
        ]
    }
    const toggleTODO = {
        type: types.TOGGLE_TODO,
        payload: {
            id: 0
        }
    }

    it('should handle ADD_TODO', () => {
        expect(
            todosReducer({todos: []}, actionAddTODO)
        ).toEqual(
            {
                todos: [
                    {
                        text: 'test string 1',
                        color: 'test string 2',
                        position: 'test string 3',
                        completed: false,
                        id: 0
                    }
                ]
            }
        )

        expect(
            todosReducer(
                {
                    todos: [
                        {
                            text: 'test string 1',
                            color: 'test string 2',
                            position: 'test string 3',
                            completed: false,
                            id: 0
                        }
                    ]
                },
                actionAddTODO
            )
        ).toEqual(
            {
                todos: [
                    {
                        text: 'test string 1',
                        color: 'test string 2',
                        position: 'test string 3',
                        completed: false,
                        id: 0
                    },
                    {
                        text: 'test string 1',
                        color: 'test string 2',
                        position: 'test string 3',
                        completed: false,
                        id: 1
                    }
                ]
            }
        )
    })
    it('should handle SET_TODOS', () => {
        expect(
            todosReducer({todos: []}, actionSETTODOS)
        ).toEqual(
            {
                todos: [
                    {
                        text: 'test string 1',
                        color: 'test string 2',
                        position: 'test string 3',
                        completed: false,
                        id: 0
                    }
                ]
            }
        )

        expect(
            todosReducer(
                {
                    todos: [
                        {
                            text: 'test string 1',
                            color: 'test string 2',
                            position: 'test string 3',
                            completed: false,
                            id: 0
                        }
                    ]
                },
                actionSETTODOS
            )
        ).toEqual(
            {
                todos: [
                    {
                        text: 'test string 1',
                        color: 'test string 2',
                        position: 'test string 3',
                        completed: false,
                        id: 0
                    }
                ]
            }
        )
    })
    it('should handle TOGGLE_TODO', () => {
        expect(
            todosReducer({todos: []}, actionSETTODOS)
        ).toEqual(
            {
                todos: [
                    {
                        text: 'test string 1',
                        color: 'test string 2',
                        position: 'test string 3',
                        completed: false,
                        id: 0
                    }
                ]
            }
        )

        expect(
            todosReducer(
                {
                    todos: [
                        {
                            text: 'test string 1',
                            color: 'test string 2',
                            position: 'test string 3',
                            completed: false,
                            id: 0
                        }
                    ]
                },
                toggleTODO
            )
        ).toEqual(
            {
                todos: [
                    {
                        text: 'test string 1',
                        color: 'test string 2',
                        position: 'test string 3',
                        completed: true,
                        id: 0
                    }
                ]
            }
        )
    })
    it('should handle SET_TODO_FETCH_SUCCEEDED', () => {
        expect(todosReducer({fetchStatus: FETCH_PENDING, todos: []}, {
            type: SET_TODO_FETCH_SUCCEEDED
        })).toEqual({fetchStatus: FETCH_COMPLETED, todos: []})
    })
    it('should handle SET_TODO_FETCH_REQUESTED', () => {
        expect(todosReducer({fetchStatus: FETCH_ERROR, todos: []}, {
            type: SET_TODO_FETCH_REQUESTED
        })).toEqual({fetchStatus: FETCH_PENDING, todos: []})
    })
    it('should handle SET_TODO_FETCH_FAILED', () => {
        expect(todosReducer({fetchStatus: FETCH_PENDING, todos: []}, {
            type: SET_TODO_FETCH_FAILED
        })).toEqual({fetchStatus: FETCH_ERROR, todos: []})
    })
})
