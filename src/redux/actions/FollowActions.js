import { GET_FOLLOWS, CREATE_FOLLOW, DELETE_FOLLOW } from '../actions/types';
import axios from 'axios'

export const getFollows = () => dispatch => {
    axios.get('http://localhost:3000/follows')
        .then(follow => dispatch({ type: GET_FOLLOWS, payload: follow.data }))
}

export const deleteFollow = (followid) => dispatch => {
    debugger
    axios.delete(`http://localhost:3000/follows/${followid}`)
        .then(dispatch({ type: DELETE_FOLLOW }))
}
export const createFollow = (postuser, currentuser) => dispatch => {
    axios.post('http://localhost:3000/follows', { followee_id: postuser, follower_id: currentuser })
        .then(dispatch({ type: CREATE_FOLLOW }))
}