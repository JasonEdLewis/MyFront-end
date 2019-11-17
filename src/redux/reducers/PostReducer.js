import {
    REQUESTING, POST_SUCCESS, POST_FAILURE, CREATE_POST, EDIT_POST_CAPTION, ADD_LIKE, DELETE_POST,
    SUBMITTED_COMMENT, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT
} from '../actions/types'

const initialState = {
    posts: [],
    request: null,
    success: null,
    errorMessage: "",
    editingPost: false,
    submittedComment: false,

}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUESTING:
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
            debugger
            const idx = state.posts.findIndex(post => post.id === action.id)
            const post = state.post[idx]
            const pts = [
                ...state.posts.slice(0, idx),
                Object.assign({}, post, { caption: action.payload },
                    ...state.payload.slice(idx + 1))
            ]
            return {
                ...state,
                posts: pts
            }
        // case ADD_LIKE:
        //     debugger
        //     const ix = state.posts.data.findIndex(p => p.id === action.payload.id)
        //     const likedpost = state.posts[ix]

        //     return{...state,
        //         posts: [...state.posts.slice(0, ix),
        //                 Object.assign({}, likedpost, {likes: action.payload.numLikes}),
        //                 ...state.posts.slice(ix + 1)
        //         ]
        //      }
        default:
            return state;
    }

}