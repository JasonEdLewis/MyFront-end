import { REQUEST_POST, POST_SUCCESS, POST_FAILURE, CREATE_POST, EDIT_POST, DELETE_POST } from '../actions/types'

const initialState = {
    post: [],
    request: null,
    success: null,
    errorMessage: ""
}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_POST:
            return { ...state, request: true }
        case POST_SUCCESS:
            return {
                ...state, request: false, success: true,
                post: action.payload
            }
        case POST_FAILURE:
            return { ...state, success: false, request: false, errorMessage: action.payload }
        case CREATE_POST:
            return {
                ...state, request: false, success: true,
                post: [...state.post, action.payload]
            }
        case EDIT_POST:
            return {
                ...state

            }

        default:
            return state;
    }

}