import {SUBMITTED_COMMENT,ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT} from './types';
import axios from 'axios'


const url = 'http://localhost:3000/comments/'

export const addComment =(info)=> async dispatch =>{
  debugger
    dispatch( { type: SUBMITTED_COMMENT} )
  const comment = await axios.post(url, info);
  dispatch( {type:ADD_COMMENT, submitted: false, payload: comment.data } )
  console.log("COMMENTS ACTION:", comment.data);
}

export const editComment =(id, info) => dispatch =>{
  axios.patch( `url${id}`, info)
  .then(comment => dispatch({ type:EDIT_COMMENT, payload: comment.data }))
}
export const deleteComment =(id) => dispatch =>{
  axios.delete(`url${id}`)
  .then( dispatch( {type:DELETE_COMMENT } ))
}