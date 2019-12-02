// import { SUBMITTED_COMMENT, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../actions/types'

// const initialState = {
//     comments: [],
//     submitted: null,

// }
// export default function (state = initialState, action) {
//     switch (action.type) {
//         case SUBMITTED_COMMENT:
//             return { ...state, submitted: true }
//         case ADD_COMMENT:
//             debugger
//             return {
//                 ...state,
//                 submitted: false,
//                 comments: state.comments.concat(action.payload)
//             }
//         case EDIT_COMMENT:
//             const idx = state.comments.findIndex(com => com.id === action.payload.id)
//             const com = state.comments[idx]
//             return {
//                 ...state,
//                 comments: [state.comments.slice(0, idx),
//                 Object.assign({}, com, action.payload),
//                 state.comments.slice(idx + 1)]
//             }
//         case DELETE_COMMENT:
//             const coms = state.comments.filter(com => com.id !== action.id)
//             return {
//                 ...state,
//                 comments: coms
//             }
//         default:
//             return state;
//     }
// }