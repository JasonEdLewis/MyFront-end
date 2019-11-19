import {
    REQUESTING, POST_SUCCESS, POST_FAILURE, CREATE_POST, EDIT_POST_CAPTION, ADD_LIKE, DELETE_LIKE, DELETE_POST, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT
} from '../actions/types'

const initialState = {
    posts: [],
    requested: null,
    success: null,
    errorMessage: "",
    editingPost: false,
    submittedComment: false,

}
export default (state = initialState, action) => {
    switch (action.type) {
        //POST PROPER
        case REQUESTING:
            return { ...state, requested: true }
        case POST_SUCCESS:
            return {
                ...state, requested: false, success: true,
                posts: action.payload
            }
        case POST_FAILURE:
            return { ...state, success: false, requested: false, errorMessage: action.payload }
        case CREATE_POST:
            return {
                ...state, requested: false, success: true,
                posts: state.posts.concat(action.payload)
            }
        case EDIT_POST_CAPTION:

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

        // COMMENTS 

   
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
            case ADD_COMMENT:
                const idb = state.posts.findIndex(post => post.id === action.id)
                const thePost = state.posts[idb]
              
                return {
                    ...state,
                    requested: false,
                    posts: [...state.posts.slice(0, idb),
                    Object.assign({}, thePost, { comments: [...thePost.comments,action.payload] }),
                    ...state.posts.slice(idb + 1)],
                    
        }

        // LIKES
            case ADD_LIKE:
                const ix = state.posts.findIndex(p => p.id === action.id)
                const likedpost = state.posts[ix]
                return {
                    ...state,
                    requested: false,
                    posts: [...state.posts.slice(0, ix),
                    Object.assign({}, likedpost, { likes: likedpost.likes + 1 }),
                    ...state.posts.slice(ix + 1)
                    ]
                }
        case DELETE_LIKE:
            const iz = state.posts.findIndex(p => p.id === action.id)
            const dislikedpost = state.posts[iz]
            if (dislikedpost.likes > 0) {
                return {
                    ...state,
                    requested: false,
                    posts: [...state.posts.slice(0, iz),
                    Object.assign({}, dislikedpost, { likes: dislikedpost.likes - 1 }),
                    ...state.posts.slice(iz + 1)
                    ]
                }
            }


        //END
        default:
            return state;
    }

}