import {
    REQUESTING, POST_SUCCESS, POST_FAILURE, CREATE_POST, EDIT_POST_CAPTION, ADD_LIKE, DELETE_POST, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT
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
        //POST PROPER
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
                post: state.posts.concat(action.payload)
            }
        case EDIT_POST_CAPTION:
            debugger
            const idx = state.posts.findIndex(post => post.id === action.id)
            const post = state.posts[idx]
            const posts = [
                ...state.posts.slice(0, idx),
                Object.assign({}, post, action.payload),
                ...state.posts.slice(idx + 1)
            ]
            return {
                ...state,
                posts
            }
        // LIKES
        case ADD_LIKE:
            const ix = state.posts.findIndex(p => p.id === action.id)
            const likedpost = state.posts[ix]
            return {
                ...state,
                posts: [...state.posts.slice(0, ix),
                Object.assign({}, likedpost, { likes: action.likes }),
                ...state.posts.slice(ix + 1)
                ]
            }
        // COMMENTS 

        case ADD_COMMENT:
            debugger
            const idb = state.posts.findIndex(post => post.id === action.payload.post_id)
            const thePost = state.posts[idb]
            return {
                ...state,
                submitted: false,
                post: [state.posts.slice(0, idb),
                Object.assign({}, thePost, thePost.comments.concat(action.payload)),
                state.posts.slice(idb + 1)]
            }
        case EDIT_COMMENT:
            const ixa = state.comments.findIndex(com => com.id === action.payload.id)
            const com = state.comments[ixa]
            return {
                ...state,
                comments: [state.comments.slice(0, ixa),
                Object.assign({}, com, action.payload),
                state.comments.slice(ixa + 1)]
            }
        case DELETE_COMMENT:
            const coms = state.comments.filter(com => com.id !== action.id)
            return {
                ...state,
                comments: coms
            }


        //END
        default:
            return state;
    }

}