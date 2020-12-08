import {menuReducer} from "../menu.js";
import {TOGGLE_MENU} from "../../actions/actionTypes.js";

describe('todos reducer', () => {
    it('should return the initial state', () => {
        expect(menuReducer(undefined, {})).toEqual({mobileOpened: false})
        expect(menuReducer({mobileOpened: false}, {type: TOGGLE_MENU})).toEqual({mobileOpened: true})
    })
})
