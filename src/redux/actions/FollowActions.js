import { GET_FOLLOWS, CREATE_FOLLOW, DELETE_FOLLOW } from '../actions/types';
import axios from 'axios'

export const getFollows = () => dispatch => {
    axios.get('http://localhost:3000/follows')
    .then(follow => dispatch( {type:GET_FOLLOWS, payload: follow.data } ) )
}

