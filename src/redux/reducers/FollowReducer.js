import { GET_FOLLOWS, CREATE_FOLLOW, DELETE_FOLLOW } from '../actions/types'

const initialState = []

export default function( state = initialState, action){
    switch (action.type) {
        case GET_FOLLOWS:
            return state.concat(action.payload ) 

        case CREATE_FOLLOW:
            return state.concat(action.payload)

        case DELETE_FOLLOW:
            debugger
            const remainingFriends = state.filter(ele => ele.id !== action.id)
            return {state: remainingFriends}
        default:
            return state
    }
}