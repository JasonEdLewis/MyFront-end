import { REQUEST_LOGIN ,SUCCESSFUL_LOGIN ,FAILED_LOGIN ,LOGGED_OUT} from '../actions/types';

const initialState = {
    requested: null,
    success: null,
    token: '',
    loggedIn: null,
    errorMessage: '',

}
export default (state = initialState, action)=>{
        switch (action.type) {
            case REQUEST_LOGIN:
                return
            case FAILED_LOGIN:
                return
            case SUCCESSFUL_LOGIN:
                    return
            case LOGGED_OUT:
                return
            default:
                return state
        }
}