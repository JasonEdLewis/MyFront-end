import {
    REQUEST_POST, POST_SUCCESS, POST_FAILURE, CREATE_POST, EDIT_POST_CAPTION, DELETE_POST,
    SUBMITTED_COMMENT, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT
} from '../actions/types'

const initialState = {
    posts: [],
    request: null,
    success: null,
    errorMessage: "",
    editingPost:false,
    submittedComment:false,

}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_POST:
            return { ...state, request: true }
        case POST_SUCCESS:
            return {
                ...state, request: false, success: true,
                posts: action.payload
            }
        case POST_FAILURE:
            return { ...state, success: false, request: false, errorMessage: action.payload }
        case CREATE_POST:
            return {
                ...state, request: false, success: true,
                post: [...state.post, action.payload]
            }
        case EDIT_POST_CAPTION:
            const idx = state.post.findIndex(post => post.id === action.payload.id)
            const post = state.post[idx]
            const pts = [
                state.posts.slice(0,idx),
                Object.assign({}, post, {caption:action.payload},
                ...state.payload.slice(idx+1) )
            ]
            return {
                ...state,
                posts:pts
            }

        default:
            return state;
    }

}