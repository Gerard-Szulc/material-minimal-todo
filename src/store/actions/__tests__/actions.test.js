import * as actions from '../actions.js'
import * as types from '../actionTypes.js'

describe('test redux actions', () => {
    it('should create an action to add a todo', () => {
        const text = 'test string 1'
        const color = 'test string 2'
        const position = 'test string 3'
        const expectedAction = {
            type: types.ADD_TODO,
            payload: {
                text,
                color,
                position
            }
        }
        expect(actions.addTodo({text,color, position})).toEqual(expectedAction)
    })
    it('should create an action to toggleTodo', () => {
        const id = 1
        const expectedAction = {
            type: types.TOGGLE_TODO,
            payload: {id}
        }
        expect(actions.toggleTodo(id)).toEqual(expectedAction)
    })
    it('should create an action to changeColor', () => {
        const id = 1
        const color = 'test color'

        const expectedAction = {
            type: types.SET_COLOR,
            payload: {id, color}
        }
        expect(actions.changeColor({id, color})).toEqual(expectedAction)
    })
    it('should create an action to changeText', () => {
        const id = 1
        const text = 'test color'

        const expectedAction = {
            type: types.SET_TEXT,
            payload: {id, text}
        }
        expect(actions.changeText({id, text})).toEqual(expectedAction)
    })
    it('should create an action to toggleMenu', () => {
        const expectedAction = {
            type: types.TOGGLE_MENU,
        }
        expect(actions.toggleMenu()).toEqual(expectedAction)
    })
    it('should create an action to saveTodos', () => {
        const expectedAction = {
            type: types.SAVE_TODOS,
        }
        expect(actions.saveTodos()).toEqual(expectedAction)
    })
})
