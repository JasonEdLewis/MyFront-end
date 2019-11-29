import { USER_REQUEST, USER_SUCCESS, USER_FAILURE, CREATE_USER, UPDATE_USER, DELETE_USER, GET_ALL } from '../actions/types'

const initialState = {
    all: [],
    usersObj:{},
    username: "",
    id: "",
    bio:"",
    city:"",
    state:"",
    picture: "",
    requested: null,
    errorMessage: "",

}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return { ...state, requested: true }

        case USER_SUCCESS:
            return { ...state, username: action.payload.username, id: action.payload.id, picture: action.payload.picture, bio: action.payload.bio, city:action.payload.city, state:action.payload.state }

        case USER_FAILURE:
            return { ...state, errorMessage: action.payload.message, requested: false }

        case CREATE_USER:
            return { ...state }
        case UPDATE_USER:
            return { ...state }
        case DELETE_USER:
            return { ...state }
        case GET_ALL:
            return {
                ...state,
                all: action.payload,
                usersObj: action.usersObj

            }
        default:
            return state;
    }
}