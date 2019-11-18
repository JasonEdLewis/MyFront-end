import { GET_FOLLOWS, CREATE_FOLLOW, DELETE_FOLLOW } from '../actions/types'

const initialState = {
    follows: [],
    requested: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FOLLOWS:
            return {
                ...state,
                follows: action.payload
            }

        case CREATE_FOLLOW:
            return {
                ...state,
                follows: state.follows.concat(action.payload)
            }

        case DELETE_FOLLOW:
            const remainingFriends = state.follows.filter(ele => ele.id !== action.id)
            return {
                ...state,
                follows: remainingFriends
            }

        default:
            return state
    }
}