import { REQUEST_LOGIN, SUCCESSFUL_LOGIN, FAILED_LOGIN, LOG_OUT } from '../actions/types';

const initialState = {
    requested: false,
    success: null,
    token: '',
    loggedIn: null,
    errorMessage: '',

}
export default (state = initialState, action) => {
    switch (action.type) {

        case REQUEST_LOGIN:
            return { ...state, requested: true }
        case FAILED_LOGIN:

            return { ...state, requested: false, success: false, errorMessage: action.payload }
        case SUCCESSFUL_LOGIN:
            return { ...state, requested: false, success: true, loggedIn: true, token: action.payload }
        case LOG_OUT:
            return { ...state, loggedIn: false, token: "", success: null, requested: false }
        default:
            return state
    }
}