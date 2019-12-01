import { USER_REQUEST, USER_SUCCESS, USER_FAILURE, GET_ALL, CREATE_USER, UPDATE_USER, DELETE_USER, FINISHED_REQUESTING } from '../actions/types';
import axios from 'axios';

export const fetchAllUsers = () => async dispatch => {
    const users = await axios.get('http://localhost:3000/users');
    const usersObj = () => {
        const obj = {}
        users.data.forEach(user => obj[user.id] = user.username)
        return obj
    }
    console.log("User object from fetch all users", usersObj())
    dispatch({ type: GET_ALL, payload: users.data, usersObj: usersObj(), requested:false });

}
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

    !!user && localStorage.setItem("currentUser", user.data.username, 'currentUserId', user.data.id, user.data.bio, user.data.city, user.data.state)
    return console.log("From fetch User in UsersActions", user.data);

}

export const newUser = (info) => dispatch => {
    dispatch({ type: USER_REQUEST })
    return axios.post('http://localhost:3000/signup', info).then(user => dispatch({ type: CREATE_USER, payload: user.data, requested: false })
    )
}
export const editUser=(id,info)=> dispatch=>
{
    return axios.patch(`http://localhost:3000/users/${id}`, info)
    .then(user => dispatch( {type:UPDATE_USER, payload:user.data } )   )
}
export const deleteUser = (id) => dispatch => {
    dispatch({ type: USER_REQUEST })
    localStorage.clear()
    return axios.delete(`http://localhost:3000/users/${id}`)
        .then(dispatch({ type: DELETE_USER, id, requested: false }))
        .then(dispatch({type:FINISHED_REQUESTING}))



}
