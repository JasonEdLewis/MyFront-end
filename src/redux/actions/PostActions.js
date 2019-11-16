import { REQUESTING, POST_SUCCESS, POST_FAILURE, CREATE_POST, EDIT_POST_CAPTION, DELETE_POST } from './types';
import axios from 'axios'

export const getPost = () => dispatch => {
    dispatch({ type: REQUESTING })
    axios.get('http://localhost:3000/posts').then(data => {
        dispatch({ type: POST_SUCCESS, payload: data })
        // console.log("From post actions",data)
    }

    )

}
export const editCaption = (id, info) => dispatch => {
    dispatch({ type: REQUESTING })
    const data = axios.patch(`http://localhost:3000/posts/${id}`, info)
        .then(console(data))
    dispatch({ type: EDIT_POST_CAPTION, payload: data, request: false })
}