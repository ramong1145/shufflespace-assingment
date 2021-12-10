
import { SET_TOKEN } from '../constants'

export const setTokenAction = (userToken) => {
    return {type: SET_TOKEN, token: userToken};
}