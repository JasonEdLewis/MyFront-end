import { REQUESTING, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from './types';
import axios from 'axios'


const url = 'http://localhost:3000/comments/'

export const addComment = (info) => dispatch => {

  dispatch({ type: REQUESTING })
   axios.post(url, info)
   .then( comment => { 
    dispatch({ type: ADD_COMMENT, submitted: false, id: comment.data.post_id, payload: comment.data.content })
  console.log("COMMENTS ACTION:", comment.data.content);
})
}

export const editComment = (id, info) => dispatch => {

  axios.patch(`url${id}`, info)
    .then(comment => dispatch({ type: EDIT_COMMENT, payload: comment.data }))
}
export const deleteComment = (id) => dispatch => {
  axios.delete(`url${id}`)
    .then(dispatch({ type: DELETE_COMMENT }))
}