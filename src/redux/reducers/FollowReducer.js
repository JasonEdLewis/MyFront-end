import { GET_FOLLOWS, CREATE_FOLLOW, DELETE_FOLLOW } from '../actions/types'

const initialState = []

export default function( state = initialState, action){
    switch (action.type) {
        case GET_FOLLOWS:
            return state.concat(action.payload ) 

        case CREATE_FOLLOW:
            return {

            }
        case DELETE_FOLLOW:
            return {

            }
            
    
        default:
            return state
    }
}