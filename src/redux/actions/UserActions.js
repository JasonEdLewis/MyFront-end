import { USER_REQUEST, USER_SUCCESS, USER_FAILURE, GET_ALL, CREATE_USER, UPDATE_USER, DELETE_USER } from '../actions/types';
import axios from 'axios';
import { database } from 'firebase';

export const fetchUser = (token) => async dispatch => {
    dispatch({ type: USER_REQUEST })
    const config = {
        headers: {
            "Content-Type": "Application/json",
            Authorization: token
        }
    }
    const user = await axios.get('http://localhost:3000/profile', config);
    console.log(user.username)
    !!user ? dispatch({ type: USER_SUCCESS, payload: user.data })
        : dispatch({ type: USER_FAILURE, payload: user.message })

    !!user && localStorage.setItem("currentUser", user.data.username, 'currentUserId', user.data.id)
    return console.log("From fetch User in UsersActions", user.data);

}
export const fetchAllUsers = () => async dispatch => {
    const users = await axios.get('http://localhost:3000/users');
    dispatch({ type: GET_ALL, payload: users.data });

}
export const newUser = (info) => dispatch => {
    dispatch({ type: USER_REQUEST })
 return   axios.post('http://localhost:3000/signup', info).then(user =>  dispatch({ type: CREATE_USER, payload: user.data, requested:true })
    )
}
