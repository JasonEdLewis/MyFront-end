import {SUBMITTED_COMMENT,ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT} from './types';
import axios from 'axios'




export const addComment =(info)=> async dispatch =>{
    dispatch( { type: SUBMITTED_COMMENT} )
  const comment = await axios.post('http://localhost:3000/comments/', info);
  dispatch( {type:ADD_COMMENT, submitted: false, payload: comment.data } )
  console.log("COMMENTS ACTION:", comment.data);
}