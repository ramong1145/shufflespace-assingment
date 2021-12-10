
import { SET_TOKEN } from '../constants'

export const setTokenAction = (userToken) => {
    console.log(`action: ${userToken}`)
    return {type: SET_TOKEN, token: userToken};
}