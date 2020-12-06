import {todosReducer} from '../todos.js'
import * as types from '../../actions/actionTypes.js'
import {FETCH_PENDING} from "../../../utils/fetchTypes.js";

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
})
