import { REQUESTING, POST_SUCCESS, POST_FAILURE, CREATE_POST, ADD_LIKE,EDIT_POST_CAPTION, DELETE_POST } from './types';
import axios from 'axios'

export const getPost = () => dispatch => {
    dispatch({ type: REQUESTING })
    axios.get('http://localhost:3000/posts')
    .then(post => {
        dispatch({ type: POST_SUCCESS, payload: post.data})
        console.log("From post actions",post.data)
    }

    )

}
export const editCaption = (id, info) => dispatch => {
    debugger
    dispatch({ type: REQUESTING })
    axios.patch(`http://localhost:3000/posts/${id}`, { caption: info })
        .then(post => {  console.log(post.data)
   dispatch({ type: EDIT_POST_CAPTION, payload: post.data,id, request: false })
   console.log(post)
        }
        
    )

}
export const addLike = (id, numLikes) => dispatch =>{
    dispatch({ type: REQUESTING })
    axios.patch(`http://localhost:3000/posts/${id}`, { likes: numLikes})
    dispatch( { type: ADD_LIKE, id,likes: numLikes } )
}