import { handleActions } from 'redux-actions'
import * as types from '../constants';
import initialState from './initialState';

const setTokenReducer = handleActions({
    [types.SET_TOKEN]: (state, action) => {
        console.log(`reducer: ${state}`)
        return {
            ...state,
            token: action.token
        };
    },
}, initialState);

export default setTokenReducer;