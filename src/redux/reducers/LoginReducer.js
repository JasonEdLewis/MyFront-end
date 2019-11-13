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
                return {... state, requested:true}
            case FAILED_LOGIN:
                return {... state, requested:false, success:false, errorMessage: action.payload}
            case SUCCESSFUL_LOGIN:
                    return {... state, requested:false, loggedIn:true, token: action.payload}
            case LOGGED_OUT:
                return { ... state, loggedIn: false, token: ""}
            default:
                return state
        }
}