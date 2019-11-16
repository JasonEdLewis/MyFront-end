import {SUBMITTED_COMMENT,ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT} from './types';
import axios from 'axios'


export const addComment =(info)=> async dispatch =>{
    dispatch( { type: SUBMITTED_COMMENT} )
  const data = await axios.post('http://localhost:3000/comments/', info);
    console.log("COMMENTS ACTION:", data);


}